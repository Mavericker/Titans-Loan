Titans-Loan
===========

Titans-Loan v.1

Aplikácia implementuje 3 ad-hoc obrazovky


1. Obrazovka definuje vlasnosti klienta (vek|pohlavie|mzda)
2. Obrazovka je polymorfne generovaná na základe vstupov z obrazovky jedna. Obrazovka zbiera hodnoty k vlastnostiam z obrazovky jedna
3. Obrazovka spracúva model dát , pričom z neho vypočítava (vymyslenú) mieru rizika pri poskytnutí úveru na základe profilu klienta z krokov 1 a 2. Výpočet rizika je ekvivalent k výpočtu bankového "Ratingu" (A,B,C ....)


**Live verzia** : http://titans.xvioli.com



 - Dynamické pridávanie možností do select boxu
  [providers.js:104](https://github.com/Mavericker/Titans-Loan/blob/master/js/providers/providers.js#L104)
  
----
- Dynamické definície datatypov v select boxe . V demo aplikácii sú 2 typy - select,input  
- Datatypes sa dynamicky načítavajú zo zložky z externých templatov. Tzn., že je možné dynamicky definovať dizajn rôznych typov vstupov
  [view/datatype](https://github.com/Mavericker/Titans-Loan/tree/master/view/datatype)
    
----
- Zadefinovaná custom direktíva "attribute-name" s názvom "be-pretty", ktorá aplikuje pekný dizajn na selectboxy.
- jQuery plugin http://silviomoreto.github.io/bootstrap-select/

    Príklad

        <select be-pretty>...</select>

---
- Výpočet vymysleného "rizika" pri vložení výšky úveru v poslednom kroku


---
Responzívny design

[screen](http://xipic.eu/ufiles/ivla5mko_SC20131230-224732.png)
[screen](http://xipic.eu/ufiles/1cmhdewc_SC20131230-224804.png)



