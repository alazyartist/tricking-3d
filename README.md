# Tricking-3d

An interactive learning tool aimed at abscracting some of the more complex nuances of the _**Tricking** Terminology_.

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

Currently have 12 Animations:

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
    npm start
```

## Development Guide

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
