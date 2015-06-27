# vlcd
Virtual LCD - node.js for ristretto! espresso PID firmware for manual expresso machines
Tested with Raspberry Pi - RASPIAN - Easy Kit 2 - Connected via USB (/dev/ttyUSB0)

![alt tag](https://raw.githubusercontent.com/kesaloh13/vlcdweb/master/screenshot.png)

##Qick start (Installation)
###Linux
- Clone or download the repo: `git clone https://github.com/kesaloh13/vlcdweb`.
- Install node: `sudo apt-get node`.
- Change into vlcdweb directory
- Install dependencies: `npm install` (be patient, takes a while on raspi / 5 to 10 minutes)
- Check config file `config.json` for proper configuration of serial device (e.g. /dev/ttyUSB0)
- Start app:  `node app.js`
- Connect with browser: `http://computername:8080`
- If everything works correctly you can install it as a service `node_modules/initd-forever/bin/initd-forever.js -n vlcdweb -a ~/vlcdweb/app.js -f ~/vlcdweb/node_modules/forever/bin/forever` and `sudo chdmod 755 vlcdweb` and `sudo cp vlcdweb /etc/init.d` and `sudo update-rc.d vlcdweb defaults`


###Windows
- Clone or download the repo: `git clone https://github.com/kesaloh13/vlcdweb`.
- Install node: Download and install (https://nodejs.org/download/)
- Open cmd and change into vlcdweb directory
- Install dependencies: `npm install`
- Check config file `config.json` for proper configuration of serial device (e.g. COM6)
- Start app:  `node app.js`
- Connect with browser: `http://localhost:8080`
- If you want to install it as a service use: NSSM (https://nssm.cc/)

##Usage
You can use it with a HTML5 compatible browser on different devices. E.g. Android/iPhone/iPad.
- Connect your computer or embedded device (e.g. raspberry pi) via serial interface to the coffee machine
- Connect the  device to your network (lan or wifi)
- Open the address "http://computername:8080" on one of your devices (e.g. smartphone). Replace computername with the name or ip address of the device connected to the coffee machine.
- Navigation is possible with following methods:

Event                  | Behavior
---------------------- | -------------------------------------------------
Touch/click button     | Sends the command
Hold button            | Touch/click and hold button will repeate command
Click on display       | Sends OK
Right click (mouse)    | Sends ESC
Mouse wheel            | Sends up/down command
Keyboard up/down       | Sends up/down command
Keyboard ESC/Enter     | Sends Back and OK command

#Compatibility
##Tested client devices:
- Samsung Galaxy Note 3: Android Browser and Chrome
- Windows 8.1: Firefox, Chrome, Internet Explorer 11
- ... Please tell me if you tested it successfully on other devices

##Tested server devices:
- Raspberry pi B+ (Model 1) with raspbian
- Windows 8.1, 64bit
