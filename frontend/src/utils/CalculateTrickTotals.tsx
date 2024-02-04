export const getFullTricks = async (combo, ctx) => {
  try {
    let newData = combo.map(async (trick) => {
      if (trick.type === "Trick") {
        let td = await ctx.prisma.tricks.findUnique({
          where: { trick_id: trick.trick_id },
          include: {
            base: true,
            variations: { include: { variation: true } },
          },
        });
        return td;
      }
      if (trick.type === "Transition") {
        let td = await ctx.prisma.transitions.findUnique({
          where: { id: trick.id },
        });
        return td;
      }
    });
    await Promise.all(newData);
    // console.log(newData);
    return Promise.all(newData);
  } catch (e) {
    console.log(e);
  }
};
const calculateTrickTotals = async (tricks, curData, ctx) => {
  if (tricks) {
    let trickCount = {};
    let chains = {};
    let chainNum = 0;
    let bonusScore = 0;
    let chainMap: any[] = [];
    let varietyMap: any[] = [];
    let variety = { multiplier: 0 };
    let executionAverage = 0;
    let chainBreakers = [
      "Redirect",
      "Hook",
      "Round",
      "Carry Through",
      "Hop",
      "Bound",
    ];

    const sessionDataScores = await ctx.prisma.sessiondatascores.findMany({
      where: { sessiondataid: curData.id },
    });
    const fullTricks = await getFullTricks(tricks, ctx);
    let powerScore = fullTricks.reduce((sum, b) => sum + b?.pointValue, 0);
    if (sessionDataScores) {
      // console.log("sessionDataScores", sessionDataScores);
      executionAverage =
        sessionDataScores.reduce((sum, b) => {
          // console.log(sum);
          return sum + b.executionScore;
        }, 0) / sessionDataScores.length || 0;
    }

    const fullcomposition = fullTricks?.map((t) => {
      if (t.type === "Trick") {
        //@ts-ignore
        let finalScore;
        let compScore = t?.variations.filter(
          (tr) =>
            tr.variation.name === "FullTwist" || tr.variation.name === "Twist"
        ).length;
        if (compScore > 0) {
          finalScore = compScore;
        } else finalScore = 1;
        if (
          t.trickType !== "Kick" &&
          ((t?.variations?.some(
            (v) => v.variation.variationType === "Rotation"
          ) &&
            t?.variations?.some((v) => v.variation.name === "Hook")) ||
            (t?.variations?.some(
              (v) => v.variation.variationType === "Rotation"
            ) &&
              t?.variations?.some((v) => v.variation.name === "Round")))
        ) {
          finalScore += 0.5;
        }
        if (t?.trickType === "Kick" && compScore > 1) {
          finalScore -= 0.51;
        }
        if (
          t?.variations?.some((v) => v.variation.variationType === "DoubleFlip")
        ) {
          finalScore += 3;
        }
        return finalScore;
      } else {
        switch (t.transitionType) {
          case "Singular": {
            return 1;
            break;
          }
          case "Sequential": {
            return 0.5;
            break;
          }
          case "Unified": {
            return 0.25;
            break;
          }
        }
      }
    });

    // console.log(fullcomposition, "fullComposition");

    //CHAIN CALCULATIONS VVVV
    tricks.forEach((obj, i) => {
      if (chainBreakers.includes(obj.name)) {
        console.log("brokeChain");
        return chainNum++;
      }
      if (obj.type === "Trick") return;

      if (chains[`${chainNum}`]) {
        // console.log("before", chains[`${chainNum}`].multiplier);
        if (obj.type === "Transition" && !chainBreakers.includes(obj.name)) {
          //Update Current Chain
          let decrease = fullcomposition[i + 1] < fullcomposition[i - 1];
          let compSubtotal = fullcomposition[i - 1] + fullcomposition[i + 1];
          let bonus = compSubtotal >= 3.5;
          chains[`${chainNum}`].count++;
          //touchdown Nerf
          if (
            fullTricks[i + 1].variations
              .map((v) => v.variation.variationType)
              .includes("Touchdown") &&
            !fullTricks[i + 1].variations
              .map((v) => v.variation.variationType)
              .includes("Rotations")
          ) {
            chains[`${chainNum}`].multiplier += obj?.multiplier * 0.222;
          } else {
            chains[`${chainNum}`].multiplier += obj?.multiplier;
          }
          //transitionType nerf
          //if last > next: multiplier * nerf
          //singular:1,sequential:0.5,unified:0.25
          // if (
          // 	i > 1 &&
          // 	(fullcomposition[i - 2] > fullcomposition[i] ||
          // 		fullcomposition[i - 2] > 1)
          // ) {
          // 	console.log("increase *=fullcomposition[i]");
          // }
          if (bonus) {
            chains[`${chainNum}`].multiplier += compSubtotal / 10;
          }
          // console.log("after", chains[`${chainNum}`].multiplier);

          let getcurMultiplier = () => {
            // let compdif =
            // 	compSubtotal - (fullcomposition[i - 1] - fullcomposition[i + 1]);
            if (bonus) {
              return chains[`${chainNum}`]?.multiplier * compSubtotal;
            } else {
              //if next > last: multiplier * lastComp INCREASE 1->2
              if (fullcomposition[i - 1] > 1) {
                return chains[`${chainNum}`]?.multiplier * compSubtotal;
              }
              // console.log(compdif, compSubtotal, "comp");
              return chains[`${chainNum}`]?.multiplier;
            }
          };
          let getcurTrickPV = () => {
            if (decrease && fullcomposition[i - 1] < 2) {
              return tricks[i + 1].pointValue;
            }
            if (bonus) {
              //if last > 2: trick.pointValue*3
              return tricks[i + 1].pointValue * 3;
            } else return tricks[i + 1].pointValue;
          };
          //   lastcompScore *
          //   lastcompScore;
          let curMultiplier = getcurMultiplier();

          let trickPV = getcurTrickPV();

          //[index,chainScore,multiplier,name]
          chainMap.push([
            i + 1,
            trickPV * curMultiplier,
            curMultiplier,
            tricks[i + 1].name,
          ]);

          //[transition,trick,chainScore + trickValue]
          chains[`${chainNum}`].chain.push([
            obj,
            tricks[i + 1],
            trickPV * curMultiplier + tricks[i + 1].pointValue,
            chains[`${chainNum}`]?.multiplier,
            curMultiplier,
          ]);
        } else {
          //Break Chain
          // console.log("BrokeChain");
          //maybe
          //
          // if (chainBreakers.includes(obj.name)) {
          // 	chainNum++;
          // 	return;
          // }
          //Increment for Next Chain
          // chains[`${chainNum + 1}`] = chains[`${chainNum}`];
          chainNum++;
          chains[`${chainNum}`] = {
            chain: [],
            name: obj.name,
            count: 1,
            multiplier: obj.multiplier,
          };
        }
      } else {
        // //Make new Chain
        if (obj.type === "Transition") {
          chains[`${chainNum}`] = {
            chain: [],
            name: obj.name,
            count: 1,
            multiplier: obj.multiplier,
          };
          chainMap.push([
            i + 1,
            tricks[i + 1].pointValue * chains[`${chainNum}`].multiplier,
            chains[`${chainNum}`].multiplier,
            tricks[i + 1].name,
          ]);
        }
      }
    });

    //VARIETY CALCULATIONS VVVV

    fullTricks.forEach((trick, i) => {
      if (trick.type !== "Trick") return;
      let isNotVanilla = trick?.variations
        .filter((v) => v.variation.name !== "Switch")
        ?.map((v) => v.variation.variationType !== "Rotation")
        .includes(true);
      // console.log(
      // 	"switchCheck",
      // 	trick?.variations,
      // 	trick?.variations
      // 		.filter((v) => v.variation.name !== "Switch")
      // 		?.map((v) => v.variation.variationType !== "Rotation"),
      // 	trick?.variations
      // 		.filter((v) => v.variation.name !== "Switch")
      // 		?.map((v) => v.variation.variationType !== "Rotation")
      // 		.includes(true)
      // );
      let perfectMatch =
        trick?.variations
          ?.filter((v) => v.variation.name !== "Switch")
          .map((v) => v.variation.variationType !== "Rotation") ===
        fullTricks[i - 2]?.variations
          ?.filter((v) => v.variation.name !== "Switch")
          .map((v) => v.variation.variationType !== "Rotation");
      let uniqueVariations: number[] = Array.from(
        new Set(
          trick?.variations?.map((v) => {
            if (
              v.variation.variationType !== "Rotation" &&
              v.variation.type !== "Switch"
            ) {
              return 0.75;
            }
            return 0;
          })
        )
      );
      let varietyMultiplier: number = uniqueVariations.reduce(
        (sum, b) => sum + b,
        0
      );
      let vsubtotal = 0;
      let isHyperHook =
        fullTricks[i].trickType === "Invert" &&
        fullTricks[i].variations?.some((v) =>
          v.variation.name.includes("Hook")
        ) &&
        fullTricks[i].variations?.some((v) =>
          v.variation.variationType.includes("Rotation")
        );

      const hasFlatspin = (index) => {
        return fullTricks[index].variations?.some((v) =>
          v.variation.variationType.includes("FlatSpin")
        );
      };
      if (isNotVanilla && !perfectMatch) {
        variety.multiplier += varietyMultiplier;
        vsubtotal = variety.multiplier * (1.25 * trick.pointValue);
        varietyMap.push([
          i,
          variety.multiplier,
          vsubtotal,
          trick.pointValue * 1.25,
        ]);
        // console.log(
        //   "Variated",
        //   i,
        //   variety.multiplier,
        //   trick.pointValue,
        //   trick.name,
        //   vsubtotal
        // );
      }
      // console.log(fullTricks[i].trickType);
      // if (i > 2) {
      //   console.log("hasFlatspin", hasFlatspin(i), hasFlatspin(i - 2));
      // }
      if (fullTricks[i].trickType === "Invert" && i > 2) {
        if (fullTricks[i - 2].trickType === "Invert") {
          if (!hasFlatspin(i)) {
            if (hasFlatspin(i - 2)) {
              // console.log("flatspin to invert");
              bonusScore += fullTricks[i].pointValue;
            }
            // else console.log("invert to invert");
          }
          if (hasFlatspin(i)) {
            if (hasFlatspin(i - 2)) {
              // console.log("flatspin to flatspin");
            } else {
              bonusScore += fullTricks[i].pointValue;
              // console.log("invert to flatspin");
            }
          }
        }
        if (fullTricks[i - 2].trickType === "Kick") {
          // console.log("kick to invert");
          bonusScore += 2 * fullTricks[i].pointValue;
        }
      }
      if (fullTricks[i].trickType === "Kick" && i > 2) {
        if (fullTricks[i - 2].trickType === "Kick") {
          // console.log("kick to kick");
        }
        if (fullTricks[i - 2].trickType === "Invert") {
          if (hasFlatspin(i - 2)) {
            // console.log("flatspin to kick");
            bonusScore += fullTricks[i].pointValue;
          } else {
            bonusScore += 2 * fullTricks[i].pointValue;
            // console.log("invert to kick");
          }
        }
      }
      if (fullTricks.length > 4 && i === fullTricks.length - 1 && isHyperHook) {
        // console.log("LastTrick", fullTricks[i].name, fullTricks[i]);
        bonusScore += 20;
      }
      if (
        fullTricks.length > 4 &&
        i === fullTricks.length - 1 &&
        fullcomposition[i] >= 2
      ) {
        // console.log("LastTrick", fullTricks[i].name, fullcomposition[i]);

        bonusScore += 10 * fullcomposition[i];
      }

      // console.log(
      //   "Vanilla",
      //   i,
      //   isNotVanilla,
      //   !perfectMatch,
      //   variety.multiplier,
      //   trick.name,
      //   vsubtotal
      // );

      // trick?.variations?.map((v) => console.log(i, v.variation));
    });
    // console.log(varietyMap);
    //Get Trick Count
    tricks
      .filter((t) => t.type === "Trick")
      .forEach((obj) => {
        if (trickCount[obj.name]) {
          trickCount[obj.name].count++;
        } else {
          trickCount[obj.name] = {
            count: 1,
            score: 1,
          };
        }
      });

    let chainTotal = chainMap.reduce((sum, b) => sum + b[1], 0);

    let uvScore = Object.keys(trickCount)
      .map((key) => trickCount[key])
      .reduce((sum, b) => sum + b.score, 0);
    let varietyScore =
      uvScore + varietyMap.map((arr) => arr[2]).reduce((sum, b) => sum + b, 0);
    let totalScore =
      chainTotal +
      bonusScore +
      varietyScore +
      executionAverage * (powerScore + varietyScore) +
      powerScore; //total = comboPointValue + (executionAverage * comboPointValue)+ chainScore + varietyScore
    return {
      totalScore,
      executionAverage,
      varietyScore,
      varietyMap,
      chains,
      bonusScore,
      chainTotal,
      chainMap,
      trickCount,
      powerScore,
      uvScore,
    };
  }
};

export default calculateTrickTotals;
