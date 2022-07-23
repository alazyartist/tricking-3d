# Tricking-3d

An interactive learning tool aimed at abscracting some of the more complex nuances of the _**Tricking** Terminology_.

A live version is available at [trickedex.app](https://trickedex.app) or [trickedex.com] (https:/trickedex.com)

## Project Aim

### To create an **interactive tool** that showcases the terminology of the _**Tricking**_ world in a visual format.

---

Pre-Alpha => **Alpha** _(WE ARE HERE)_ => Beta => Beta 2.0 => Release

---

## **Pre-Alpha**

### Creating proof of concept with initial 8 animations and text information

Utilize this MVP to find other people interested in the project to contribute to the later versions
Prove the interactive animated model is possible and useful

---

### **Alpha** (WE ARE HERE)

Updating Pre-Alpha to have a base of at least 16 animations (base 8 flips)+ (360 rotation Vatioations) with text information

Using the XSENS Link Motion Capture System We will be capturing animation data for a list of initial tricks

Including:

```
    backflip
    frontflip
    insideflip
    outsideflip
```

```
    gainer
    webster
    aerial
    raiz
    lotus
    gms
```

## Currently have <b>163</b> Animations:

#### Frank

```
    BTwist
    BtwistRound
    BTwistShuriken
    CorkDleg
    CorkSwingCork
    Cork Kerwood
    Cork Posi
    Raiz
    Sideflip
    TDR Cork
    Touchdown Raiz
    Webster
```

#### Alex Kerwood

```
540-Wrap
540-Wrap9
540Kick
Aerial-pop
Aerial
BKick 2
BKick
Backflip
Backflip2
Backflip3
Backflip4(best)
Backhandspring
Btwist
Btwist2
Btwist3
C7kick_2
CartDub 2
CartDub
CartOff
CartWheel_BothDirections
Cartwheel (Complete Landing) Swing 2
Cartwheel (Complete Landing) Swing
Cartwheel (Complete Landing) back to idle 2
Cartwheel (Complete Landing) back to idle
Cartwheel (Hyper Landing) 2
Cartwheel (Hyper Landing)
Cartwheel (Mega Landing) 2
Cartwheel (Mega Landing) 3
Cartwheel (Mega Landing)
Cartwheel (Semi Landing) 2
Cartwheel (Semi Landing)
CartwheelPunch
Cheat7Twist(raiz twist) 2
Cheat7Twist(raiz twist)
CheatSetup 2
CheatSetup 3
CheatSetup 4
CheatSetup 5
CheatSetup
Double_Btwist
FlashKick 2
FlashKick
Hook-MasterScoot
Hook-WrapHook 2
Hook-WrapHook
Illusion_Twist
Jstep 2
Jstep 3
Jstep 4
Jstep 5 false start
Jstep
Kerwood_Backflip2
MasterScoot
MasterScoot2
ReversaoScisso (sharp)
ReversaoScissor
RoundOff 2 (complete landing sequential)
RoundOff 2 (complete landing)
RoundOff
Sailor Moon (horizontal
Sailor MoonScissor
SailorMoon(feet janky) 2
SailorMoon(feet janky)
Scoot 2
Scoot 3 (best)
Scoot-Valdez 2
Scoot-Valdez
Scoot
SpinStep Powerful
SpinStep
StandingFull 2
StandingFull
Tornado_kick_
TouchdownRaiz-DoubleCork 2
TouchdownRaiz-DoubleCork
TouchdownRaiz-Valdez 2
TouchdownRaiz-Valdez
WrapFull
WrapFullSwing
```

#### Andrew Kohrt

```
Andrew Kohrt
Aerial GMS
AppleJacks
BS10 2
BS10
BS12 (better)
BS12
Backflip
CartDub Swing Cork
CartDub
CartDubSwingNope 2
CartDubSwingNope 3
CartDubSwingNope
CartDubfulDleg
CartDubfull
CartDubfullRound
CartFullDlegTwist
CartFullSnapu
CartFullSwipe
CartTrip 2
CartTrip
Cheat10
Cheat7
Cork Dleg
Cork Swing CorkDleg
Cork Swing SpinAround
CorkRound
CorkSnapu
CorkSwingCork
CorkSwingDub
CorkX3
DLeg
Dleg 2
Dub Swing Hookkick
DubBtwist Recovery Aerial
DubDub
DubSwing CorkSnapFail
DubSwing CorkSnapu
FlowySnapu Combo
GainerSwitchX3
Gumbi SwingNothing
Gumbi_Stepout
Handspin
Helicoptero 2
Helicoptero
Hook GMS
Hook MasterScoot Cork 2
Hook MasterScoot Cork
HuricaneKick
HuricankeKick 2
Jackknife 2
Jackknife
Machines
MasterScoot ShurikenCutter
MasterScootCork Dleg
Nike
Parafuso Hook_Dance
Parafuso
ParafusuGyro
Pop3 CartTwist
Pop3 to Split
Reversao 2
Reversao
Scoot DoubleCork
Scoot Dub
Scoot Twist
Sidekick 2
Sidekick
Snapu
SnapuToScootReady
Tdr Box
Tdr ShurikenCutter 2
Tdr ShurikenCutter
WebstertoNinja
```

---

### **Working Beta**

Updating Alpha to interpret between animations using the interactive GUI to set parameters. -removing as many animation keyframes as possible

---

### **Beta Release**

Release of Initial Beta

---

### **Release**

**PUBLIC RELEASE OF FINAL PRODUCT!**

---

### ToDo:

- [x] Animated Model
- [x] Selectable Animations
- [x] Timescale Settings
- [x] Slider for Animation
- [ ] Orthographic / Perspective Toggle
- [x] Trick Information beside Player

## What is **Tricking**

### **_Tricking_** is ...

#### the typical responses you'll receive:

> ~~a combination of kicks, flips and twists~~

> ~~a combination of elements from various forms of Martial Arts,Gymnastics Powertumbling, and Breakdancing,.~~

---

### _**Tricking**_ is ...

#### More acurately:

> an exploration of movement through the constant breaking of rules and incorporation of inspriation from outside sources

> exploration of the human body's potential for movement with only gravity and the practioner as variables.

> a complex system made of simple paramaters that have been combined to create synergies of movement styles and types that can be labeled and reffered to

# Installation Guide

```bash
    git clone https://github.com/alazyartist/tricking-3d.git
    cd tricking-3d
    npm install
    cd frontend
    npm install
    cd ../backend
    npm install
    cd ..
```

`npm run start` or `npm run server` or `npm run spinup`

start = cd frontend && npm run start<br>server= cd backend && npm nodemon node.js<br>spinup= concurrently npm run start && npm run server

## Development Guide

Some [component-name].js files have an accompanying [component-name].md to explain how to handle some the logic in the component.

If you would like to contribute to the project please do so by making separte branches:

```bash
    git checkout -b [new-branch-name]
```

after you've made your changes run:

```bash
    git push origin [new-branch-name]
```

You can then create a pull request for your changes using DEV as base

        DEV <-- [new-branch-name]

If you have a branch that you deleted but is still showing origin/[branch name] run to clean the local repo:

```bash
git remote prune origin
```
