# How to setup the project

## Requirements

Make sure you have nodejs and npm installed as well as angular cli.

npm is included with nodejs and you can install angular cli with:

```
npm install -g @angular/cli
```

On Windows -> the requirements above and: 
-install visual studio and check the “desktop developpement in c++” mark
-have python installed

## 1. Backend

fork/clone the followed git: https://gitlab.com/dreuzy/cydre

Then go to cydre/doc/ and open "guide d'installation", follow the instructions.

You can then activate your conda environnement and launch the backend by going to cydre/launchers/ and run:

```
python run_cydre_with_api.py
```

## 2. FrontEnd

When you have the right requirements, go to frontEnd/front/ and execute:
```
npm install
```
to install all the dependencies.

```
ng serve
```
to launch the angular project. Go to http://localhost:4200/ on a web Browser to see the result.

## 3. Basic use case

Choose an xml from the list and click the "go to xml view" button
![](https://hackmd.io/_uploads/SJEN0RhT2.png)

Then click the "load data" to load the xml. You can then go through it by clicking the little blue arrows
![](https://hackmd.io/_uploads/Sy8B00n6n.png)

Click on the "RUN!" button to launch the python application on the server side. It can take some time to complete. You will see the result as a json at the end. Not really practical but it shows that the python application did run and returned us a result.
![](https://hackmd.io/_uploads/H1vfRAhT2.png)

If you want to change the xml, you will have to come back to the menu with the "back to menu" link and follow the same instructions as before.