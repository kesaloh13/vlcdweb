# vlcd
Virtual LCD - node.js for ristretto! espresso PID firmware for manual expresso machines
Tested with Raspberry Pi - RASPIAN - Easy Kit 2 - Connected via USB (/dev/ttyUSB0)

##Qick start (Installation)
###Linux
- Clone or download the repo: `git clone https://github.com/kesaloh13/vlcdweb`.
- Install node: `sudo apt-get node`.
- Change into vlcdweb directory
- Install dependencies: `npm install` (be patient, takes a while on raspi / 5 to 10 minutes)
- Check config file `config.json` for proper configuration of serial device (e.g. /dev/ttyUSB0)
- Start app:  `node app.js`
- Connect with browser: `http://host:8080`
- If everything works correctly you can install it as a service `node_modules/initd-forever/bin/initd-forever.js -n vlcdweb -a ~/vlcdweb/app.js -f ~/vlcdweb/node_modules/forever/bin/forever` and `sudo chdmod 755 vlcdweb` and `sudo cp vlcdweb /etc/init.d` and `sudo update-rc.d vlcdweb defaults`


###Windows
- Clone or download the repo: `git clone https://github.com/kesaloh13/vlcdweb`.
- Install node: Download and install (https://nodejs.org/download/)
- Open cmd and change into vlcdweb directory
- Install dependencies: `npm install`
- Check config file `config.json` for proper configuration of serial device (e.g. COM6)
- Start app:  `node app.js`
- Connect with browser: `http://host:8080`
- If you want to install it as a service use: NSSM (https://nssm.cc/)