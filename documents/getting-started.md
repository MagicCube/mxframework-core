---
layout: document
title: Getting started
description: Setup development environment, and write your first application with MXFramework.
group: navigation
weight: 1
---
{% include JB/setup %}

# Setup Development Environment
## Download
The latest build of MXFramework is hosted on GitHub.
> [https://github.com/MagicCube/mxframework-core/archive/master.zip](https://github.com/MagicCube/mxframework-core/archive/master.zip)


## What's included
Once downloaded, unzip the file to a new folder named `mx`, within which you'll find the following directories and files.
These include all you need for MXFramework. 

```
mx
├── app
│   └── Application.js
├── res
│   ├── images
│   │   └── mx-logo-32.png
│   └── locales
│       ├── en
│       │   └── language.js
│       └── zh-cn
│           └── language.js
├── scn
│   └── Scene.js
├── util
│   └── ObjectPool.js
├── view
│   └── View.js
├── debug.js
├── framework-base.js
├── framework-core.js
├── javascript-extensions.js
├── mx.build
├── MXComponent.js
├── MXEvent.js
├── MXObject.js
└── README.md 
```  

## Dependencies
MXFramework only requires [jQuery](http://jquery.com) library at the run time. It is recommended to use jQuery 1.10 or later version.

## Eclipse Plugins
Although you can complete the following setup steps all by your hands, it is still the best way to start your MXFramework journey by installing the MXFramework Plugins for [Eclipse](http://eclipse.org/).

### Install
- Start your Eclipse, choose `Help > Install New Software` in the menu bar.
- Click `Add`, in the top-right corner.
- In the `Add Repository` dialog that appears, enter `MXFramework Plugin` for the `Name` and the following URL for the `Location`:
```
https://raw.githubusercontent.com/MagicCube/mxtool/master/mxtool-eclipse-updatesite/site.xml
```
- Click `OK`.
- In the `Available Software` dialog, select the checkbox next to `MagicCube MXFramework Plugins` and click `Next`.
- Click `Next`, and complete the following installation. 
- After the installation completes, restart Eclipse.

> For the convenience of the beginner, in the following sections we'll only discuss how to setup your environment by using the plugins.

# Write your first MX application
## Create a project


## Enable MXFramework

## Create a simple view

## Create an application

## What's next
I bet you already know how to setup the development environment and some basic concept in MXFramework.
Now you may jump to the [Documents](./) page to find out more interesting contents.

> Continue reading how to Write a master-detail application. 