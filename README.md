# 2D spil tank spil i p5.js

## Todo
- [x] Tank spiller (funktionalitet som at skyde, dreje osv.)
- [x] Tilføj en nedkøling til skud 
- [x] En level generator
- [x] Lokal multiplayer (coop)
- [x] Websockets (online multiplayer)
- [x] Grafik (sprites)

Tanks er 321px x 606px (width, height)

# Usage
Start med at hente koden ned:
```bash
git clone https://github.com/ViggoGaming/2dspil-p5js
```

Gå ind i mappen:
```
cd 2dspil-p5js
```

Installer pakker:
```
npm install --save
```

Start serveren:
```
node app.js
```

# Docker
Hvis man vil køre spillet på en server kan man bruge docker.

Byg docker filen (image)
```bash
docker build . -t victor/node-2dspil
```

Start docker containeren på port 3000 på din egen maskine
```bash
docker run -p 3000:3000 -d victor/node-2dspil
```

Tjek at docker containeren er startet
```
docker ps -a
```

Tjek logs fra nodejs serveren
```
docker logs containerid
```

