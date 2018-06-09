function formatValue(notation, value, places, placesUnder1000) {

    if ((value <= Number.MAX_VALUE || (player.break && (player.currentChallenge == "" || !new Decimal(Number.MAX_VALUE).equals(player.challengeTarget)) )) && (value >= 1000)) {
        if (value instanceof Decimal) {
           var power = value.e
           var matissa = value.mantissa
        } else {
            var matissa = value / Math.pow(10, Math.floor(Math.log10(value)));
            var power = Math.floor(Math.log10(value));
        }
        if ((notation === "Mixed scientific" && power >= 33) || notation === "Scientific") {
            matissa = matissa.toFixed(places)
            if (matissa >= 10) {
                matissa /= 10;
                power++;
            }
            if (power > 100000  && !player.options.commas) return (matissa + "e" + formatValue(notation, power, 3, 3))
            if (power > 100000  && player.options.commas) return (matissa + "e" + power.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            return (matissa + "e" + power);
        }
        if (notation === "Infinity") {
            const inflog = Math.log10(Number.MAX_VALUE)
            const pow = Decimal.log10(value)
            if (pow / inflog < 1000) var infPlaces = 4
            else var infPlaces = 3
            if (player.options.commas) return (pow / inflog).toFixed(Math.max(infPlaces, places)).toString().split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"."+(pow / inflog).toFixed(Math.max(infPlaces, places)).toString().split(".")[1]+"∞"
            else return (pow / inflog).toFixed(Math.max(infPlaces, places))+"∞"
        }
        if (notation.includes("engineering") || notation.includes("Engineering")) pow = power - (power % 3)
        else pow = power
        if (power > 100000  && !player.options.commas) pow = formatValue(notation, pow, 3, 3)
        if (power > 100000  && player.options.commas) pow = pow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        if (notation === "Logarithm") {
            if (power > 100000  && !player.options.commas) return "ee"+Math.log10(Decimal.log10(value)).toFixed(3)
            if (power > 100000  && player.options.commas) return "e"+Decimal.log10(value).toFixed(places).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            else return "e"+Decimal.log10(value).toFixed(Math.max(places, 1))
        }

        if (notation === "Brackets") {
          var table = [")", "[", "{", "]", "(", "}"];
          var log6 = Math.LN10 / Math.log(6) * Decimal.log10(value);
          var wholePartOfLog = Math.floor(log6);
          var decimalPartOfLog = log6 - wholePartOfLog;
          //Easier to convert a number between 0-35 to base 6 than messing with fractions and shit
          var decimalPartTimes36 = Math.floor(decimalPartOfLog * 36);
          var string = "";
          while (wholePartOfLog >= 6) {
            var remainder = wholePartOfLog % 6;
            wholePartOfLog -= remainder;
            wholePartOfLog /= 6;
            string = table[remainder] + string;
          }
          string = "e" + table[wholePartOfLog] + string + ".";
          string += table[Math.floor(decimalPartTimes36 / 6)];
          string += table[decimalPartTimes36 % 6];
          return string;
        }

        matissa = (matissa * Decimal.pow(10, power % 3)).toFixed(places)
        if (matissa >= 1000) {
            matissa /= 1000;
            power++;
        }

        if (notation === "Standard" || notation === "Mixed scientific") {
            if (power <= 303) return matissa + " " + FormatList[(power - (power % 3)) / 3];
            else return matissa + " " + getAbbreviation(power);
        } else if (notation === "Mixed engineering") {
            if (power <= 33) return matissa + " " + FormatList[(power - (power % 3)) / 3];
            else return (matissa + "ᴇ" + pow);
        } else if (notation === "Engineering") {
            return (matissa + "ᴇ" + pow);
        } else if (notation === "Letters") {
            return matissa + letter(power,'abcdefghijklmnopqrstuvwxyz');
        } else if (notation === "Emojis") {
            return matissa + letter(power,['😠', '🎂', '🎄', '💀', '🍆', '👪', '🌈', '💯', '🍦', '🎃', '💋', '😂', '🌙', '⛔', '🐙', '💩', '❓', '☢', '🙈', '👍', '☂', '✌', '⚠', '❌', '😋', '⚡'])
        }

        else {
            if (power > 100000  && player.options.commas) power = power.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return "1337 H4CK3R"
        }
    } else if (value < 1000) {
        return (value).toFixed(placesUnder1000);
    } else {
        return "Infinite";
    }
}
