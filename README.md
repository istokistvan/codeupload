A legfrissebb verzió kipróbálható: [https://istokistvan.github.io/codeupload/]

# CodeUpload
Egy cég fogyasztásösztönző promóciót
szeretne futtatni. Ennek a lényege, hogy akik vásárolnak a termékeikből, azok
részt vehetnek egy játékban, ahol nyereményeket sorsolnak ki.

A részvételhez az oldalon be kell küldeniük a vásárolt termék csomagolásában
található 8 karakterből álló kódot, illetve a termék vásárlásának idejét.
A feladat elkészíteni a promóció honlapjának frontend fejlesztését.

2 komponenses alkalmazás:
## Kódfeltöltés (Code.jsx)
  - A felhasználó egy űrlapon keresztül tud a vásárolt termék csomagolásában található kódot feltöltve résztvenni a játékban.
  - Az űrlap a következő kötelező elemekből áll:
    - **e-mail cím**: szöveges email típusú HTML input mező
    - **kód**: szöveges HTML input mező. Pontosan 8 karakterből álló kód az angol abc betűit és számokat engedélyezve
    - **vásárlás dátuma**: három darab HTML select input. Az elsőben a napot lehet kiválasztani, a másodikban az órát, a harmadikban pedig a percet
      - a kiválasztható dátum és időpont **nagyobb 2023.06.01 00:00:00-nál**, de **kisebb 2023.08.31 23:59:59-nál**, illetve nem lehet az aktuális dátumnál későbbi napot kiválasztani
      - **nap**: az alapértelmezetten kiválasztott érték az aktuális nap
      - _óra és perc alapértelmezetten üres_
## Regisztráció (Register.jsx)
  - A kódfeltöltésnek nem megelőző lépése a regisztráció, de új email címről érkező első kódfeltöltéskor a játékosnak regisztrálnia kell.
  - Az e-mail címét már ismerjük, mert kódfeltöltéskor megadta, ezért az az input mező **readonly**.
  - Ezen kívül a nevét kell megadnia kötelezően, ami egy egyszerű szöveges input mező.
  - A játékosnak mindenképp el kell fogadnia a játékszabályzatot, anélkül nem küldheti be a regisztrációját
