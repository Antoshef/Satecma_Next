const fs = require("fs");
const { DOMParser, XMLSerializer } = require("xmldom");

// Your XML string
const xmlString = `
<database name="ecohomeg_storage">
        <!-- Table product_prices -->
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMADRY WHITE</column>
            <column name="packing">25</column>
            <column name="unit">кг.</column>
            <column name="quantity"></column>
            <column name="color">бял</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">1.84</column>
            <column name="category">Замазки на циментова основа</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMADRY GREY</column>
            <column name="packing">25</column>
            <column name="unit">кг.</column>
            <column name="quantity"></column>
            <column name="color">сив</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">1.98</column>
            <column name="category">Замазки на циментова основа</column>
        </table>
        <table name="product_prices">
            <column name="code">3124</column>
            <column name="name">TECMADRY CIMENTACIONES WHITE</column>
            <column name="packing">25</column>
            <column name="quantity"></column>
            <column name="unit">кг.</column>
            <column name="color">бял</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">1.44</column>
            <column name="category">Замазки на циментова основа</column>
        </table>
        <table name="product_prices">
            <column name="code">3124</column>
            <column name="name">TECMADRY CIMENTACIONES GREY</column>
            <column name="packing">25</column>
            <column name="quantity">31</column>
            <column name="unit">кг.</column>
            <column name="color">сив</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">1.52</column>
            <column name="category">Замазки на циментова основа</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMADRY SR</column>
            <column name="packing">25</column>
            <column name="unit">кг.</column>
            <column name="quantity"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">2.00</column>
            <column name="category">Замазки на циментова основа</column>
        </table>
        <table name="product_prices">
            <column name="code">3117</column>
            <column name="name">TECMADRY F WHITE</column>
            <column name="packing">25</column>
            <column name="unit">кг.</column>
            <column name="quantity"></column>
            <column name="color">бял</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">2.86</column>
            <column name="category">Замазки на циментова основа</column>
            <column name="quantity">5</column>
        </table>
        <table name="products_storage">
            <column name="code">3198</column>
            <column name="name">TECMADRY TERMIC</column>
            <column name="package">13</column>
            <column name="unit">кг.</column>
            <column name="color">бял</column>
            <column name="quantity"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">3.88</column>
            <column name="category">Замазки на циментова основа</column>
        </table>
        <table name="product_prices">
            <column name="code">3118</column>
            <column name="name">TECMADRY ELAST WHITE</column>
            <column name="packing">30</column>
            <column name="unit">кг.</column>
            <column name="quantity"></column>
            <column name="color">бял</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">4.16</column>
            <column name="category">Замазки на циментова основа</column>
        </table>
        <table name="product_prices">
            <column name="code">3119</column>
            <column name="name">TECMADRY ELAST GREY</column>
            <column name="packing">30</column>
            <column name="unit">кг.</column>
            <column name="quantity"></column>
            <column name="color">сив</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">4.32</column>
            <column name="category">Замазки на циментова основа</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMADRY ELAST BLUE</column>
            <column name="packing">30</column>
            <column name="unit">кг.</column>
            <column name="quantity"></column>
            <column name="color">син</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">5.58</column>
            <column name="category">Замазки на циментова основа</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMADRY MILENIUM WHITE</column>
            <column name="packing">25</column>
            <column name="unit">кг.</column>
            <column name="quantity"></column>
            <column name="color">бял</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">3.20</column>
            <column name="category">Замазки на циментова основа</column>
        </table>
        <table name="product_prices">
            <column name="code">3137</column>
            <column name="name">TECMADRY MILENIUM GREY</column>
            <column name="packing">25</column>
            <column name="quantity">25</column>
            <column name="unit">кг.</column>
            <column name="quantity"></column>
            <column name="color">сив</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">3.00</column>
            <column name="category">Замазки на циментова основа</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMADRY FLEX 2C GREY</column>
            <column name="packing">25</column>
            <column name="unit">кг.</column>
            <column name="quantity"></column>
            <column name="color">сив</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">4.44</column>
            <column name="category">Замазки на циментова основа</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMADRY FLEX 2C WHITE</column>
            <column name="packing">25</column>
            <column name="unit">кг.</column>
            <column name="quantity"></column>
            <column name="color">бял</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">4.54</column>
            <column name="category">Замазки на циментова основа</column>
        </table>
        <table name="product_prices">
            <column name="code">3134</column>
            <column name="name">TECMADRY RPA</column>
            <column name="packing">25</column>
            <column name="unit">кг.</column>
            <column name="quantity"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">1.44</column>
            <column name="category">Замазки на циментова основа</column>
        </table>
        <table name="product_prices">
            <column name="code">3103</column>
            <column name="name">PREMHOR</column>
            <column name="packing">25</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">1.84</column>
            <column name="category">Ремонтни замазки</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">PREMHOR R</column>
            <column name="packing">25</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">1.98</column>
            <column name="category">Ремонтни замазки</column>
        </table>
        <table name="product_prices">
            <column name="code">3163</column>
            <column name="name">PREMHOR COSMETICO</column>
            <column name="packing">25</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">2.54</column>
            <column name="category">Ремонтни замазки</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">PREMHOR GROUT</column>
            <column name="packing">25</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">1.58</column>
            <column name="category">Ремонтни замазки</column>
        </table>
        <table name="product_prices">
            <column name="code">3176</column>
            <column name="name">PREMHOR STREET</column>
            <column name="packing">25</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="quantity">25</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">1.86</column>
            <column name="category">Ремонтни замазки</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA PAINT MRRE</column>
            <column name="packing">5</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">12.60</column>
            <column name="category">Ремонтни замазки</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA MORTAR CAL</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">1.98</column>
            <column name="category">Ремонтни замазки</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA MORTAR CAL SMOOTH</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">2.40</column>
            <column name="category">Ремонтни замазки</column>
        </table>
        <table name="product_prices">
            <column name="code">3104</column>
            <column name="name">PROQUICK</column>
            <column name="packing">20</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">3.20</column>
            <column name="category">Продукти за спиране на течове</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">PROQUICK PLUS</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">3.62</column>
            <column name="category">Продукти за спиране на течове</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA METAL PASTY - цена за брой</column>
            <column name="packing">2.5</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">0.00</column>
            <column name="category">Продукти за спиране на течове</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">QUICK</column>
            <column name="packing">0.35</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">0.00</column>
            <column name="category">Продукти за спиране на течове</column>
        </table>
        <table name="product_prices">
            <column name="code">1901</column>
            <column name="name">STOP LIQUID 7.5L</column>
            <column name="packing">1</column>
            <column name="unit">бр.</column>
            <column name="quantity">0</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">74.32</column>
            <column name="category">Продукти за спиране на течове</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMACOL FLEX</column>
            <column name="packing">25</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">2.54</column>
            <column name="category">Лепила на циментова основа</column>
        </table>
        <table name="product_prices">
            <column name="code">4108</column>
            <column name="name">TECMA PAINT BITUM CAUCHO</column>
            <column name="packing">25</column>
            <column name="quantity">1</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">4.82</column>
            <column name="category">Катранни и асфалтови продукти</column>
        </table>
        <table name="product_prices">
            <column name="code">8021</column>
            <column name="name">TECMA ASFALT NF</column>
            <column name="packing">25</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">3.82</column>
            <column name="category">Катранни и асфалтови продукти</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA PAINT BTA</column>
            <column name="packing">25</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">7.86</column>
            <column name="category">Катранни и асфалтови продукти</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA PAINT TAR E</column>
            <column name="packing">34</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">13.80</column>
            <column name="category">Катранни и асфалтови продукти</column>
        </table>
        <table name="product_prices">
            <column name="code">1521</column>
            <column name="name">SATECMA ELASTIC PM 33 BLACK 0.33L</column>
            <column name="packing">1</column>
            <column name="unit">бр.</column>
            <column name="color">черен</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">11.86</column>
            <column name="category">Уплътнители</column>
        </table>
        <table name="product_prices">
            <column name="code">1525</column>
            <column name="name">SATECMA ELASTIC PM 33 BROWN 0.33L</column>
            <column name="packing">1</column>
            <column name="unit">бр.</column>
            <column name="color">кафяв</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">11.86</column>
            <column name="category">Уплътнители</column>
        </table>
        <table name="product_prices">
            <column name="code">1591</column>
            <column name="name">SATECMA ELASTIC H2O GREY 0.33L</column>
            <column name="packing">1</column>
            <column name="unit">бр.</column>
            <column name="color">сив</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">12.04</column>
            <column name="category">Уплътнители</column>
        </table>
        <table name="product_prices">
            <column name="code">1553</column>
            <column name="name">SATECMA ELASTIC S 600 GREY 0.6L</column>
            <column name="packing">1</column>
            <column name="unit">бр.</column>
            <column name="color">сив</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">14.32</column>
            <column name="category">Уплътнители</column>
        </table>
        <table name="product_prices">
            <column name="code">3139</column>
            <column name="name">SAT KLEBEN 0.33L</column>
            <column name="packing">1</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">27.10</column>
            <column name="category">Уплътнители</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">PRIMER 1833</column>
            <column name="packing">0.5, 1</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">10.34</column>
            <column name="category">Уплътнители</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">FONDO DE JUNTAS</column>
            <column name="packing">0.01</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">0.64</column>
            <column name="category">Уплътнители</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">FONDO DE JUNTAS</column>
            <column name="packing">0.015</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">0.84</column>
            <column name="category">Уплътнители</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">FONDO DE JUNTAS</column>
            <column name="packing">0.02</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">0.98</column>
            <column name="category">Уплътнители</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">FONDO DE JUNTAS</column>
            <column name="packing">0.03</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">1.60</column>
            <column name="category">Уплътнители</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">FONDO DE JUNTAS</column>
            <column name="packing">0.05</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">2.60</column>
            <column name="category">Уплътнители</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">SATECMA BAND AD08-7.5cm</column>
            <column name="packing">20</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">0.00</column>
            <column name="category">Уплътнители</column>
        </table>
        <table name="product_prices">
            <column name="code">1493</column>
            <column name="name">SATECMA BAND AD08-10cm</column>
            <column name="packing">10</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">32.04</column>
            <column name="category">Уплътнители</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">SATECMA BAND AD08-15cm</column>
            <column name="packing">20</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">0.00</column>
            <column name="category">Уплътнители</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA INVYEC AQUA</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">20.56</column>
            <column name="category">Уплътнители</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">BENTONITA GB 0.2x0.25</column>
            <column name="packing">5</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">11.24</column>
            <column name="category">Уплътнители</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">DECAPA SCM</column>
            <column name="packing">1, 5</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">20.58</column>
            <column name="category">Антиграфити</column>
        </table>
        <table name="product_prices">
            <column name="code">3190</column>
            <column name="name">DECAPA SCM GEL</column>
            <column name="packing">5, 10, 25</column>
            <column name="quantity">, , ,</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">22.52</column>
            <column name="category">Антиграфити</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">DECAPA GRAFFIT</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">12.46</column>
            <column name="category">Антиграфити</column>
        </table>
        <table name="product_prices">
            <column name="code">4005</column>
            <column name="name">BRUTUS GEL</column>
            <column name="packing">1, 5, 10, 25</column>
            <column name="unit">л.</column>
            <column name="quantity">1, , , </column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">22.64</column>
            <column name="category">Антиграфити</column>
        </table>
        <table name="product_prices">
            <column name="code">4004</column>
            <column name="name">BRUTUS FLUIDO</column>
            <column name="packing">5</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">19.96</column>
            <column name="category">Антиграфити</column>
        </table>
        <table name="product_prices">
            <column name="code">4006</column>
            <column name="name">BRUTUS FLUIDO 0.5L</column>
            <column name="packing">1</column>
            <column name="unit">бр.</column>
            <column name="quantity">1</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">14.44</column>
            <column name="category">Антиграфити</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">PROQUIL PRB</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">16.08</column>
            <column name="category">Антиграфити</column>
        </table>
        <table name="product_prices">
            <column name="code">1071</column>
            <column name="name">AER. JV-CLEAN 0.65L</column>
            <column name="packing">1</column>
            <column name="quantity">60</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.50</column>
            <column name="price">11.96</column>
            <column name="category">Антиграфити</column>
        </table>
        <table name="product_prices">
            <column name="code">1069</column>
            <column name="name">AER. TECMA CLEAN-GUM 0.65L</column>
            <column name="packing">1</column>
            <column name="quantity">58</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.50</column>
            <column name="price">8.54</column>
            <column name="category">Антиграфити</column>
        </table>
        <table name="product_prices">
            <column name="code">1519</column>
            <column name="name">TECMA PAINT ANTIGRAF. MATT</column>
            <column name="packing">4</column>
            <column name="quantity">13</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">30.08</column>
            <column name="category">Антиграфити</column>
        </table>
        <table name="product_prices">
            <column name="code">1549</column>
            <column name="name">TECMA PAINT ANTIGRAF. GLOSS</column>
            <column name="packing">4</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">30.08</column>
            <column name="category">Антиграфити</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">ANTIGRAFFITI PRIMER</column>
            <column name="packing">10</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">25.38</column>
            <column name="category">Антиграфити</column>
        </table>
        <table name="product_prices">
            <column name="code">4131</column>
            <column name="name">IMPRIMACION A</column>
            <column name="packing">5, 10, 25</column>
            <column name="quantity">1, 1, </column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">9.32</column>
            <column name="category">Антиграфити</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">DESCOF ECO</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">4.52</column>
            <column name="category">Средства за освобождаване на кофражи</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">DESCOF - A</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">9.34</column>
            <column name="category">Средства за освобождаване на кофражи</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">PLASTICONS</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">5.02</column>
            <column name="category">Примеси за хоросан и бетон</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">ANTICONGELANTE - HM</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">4.60</column>
            <column name="category">Примеси за хоросан и бетон</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">ACELCONS</column>
            <column name="packing">6, 12, 30</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">6.08</column>
            <column name="category">Примеси за хоросан и бетон</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">HIDROFUGO 2000</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">3.16</column>
            <column name="category">Примеси за хоросан и бетон</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">RETARDADOR - FH</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">7.22</column>
            <column name="category">Примеси за хоросан и бетон</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">SATECMACAL</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">4.98</column>
            <column name="category">Примеси за хоросан и бетон</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMACONS - SF20</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">5.88</column>
            <column name="category">Примеси за хоросан и бетон</column>
        </table>
        <table name="product_prices">
            <column name="code">3164</column>
            <column name="name">TECMA ADMIX CRYSTAL</column>
            <column name="packing">25</column>
            <column name="quantity">27</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">6.64</column>
            <column name="category">Примеси за хоросан и бетон</column>
        </table>
        <table name="product_prices">
            <column name="code">3102</column>
            <column name="name">CRYLADIT</column>
            <column name="packing">2, 5, 10</column>
             <column name="quantity">, , 1</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">5.66</column>
            <column name="category">Примеси за хоросан и бетон</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA - HMF</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">2.82</column>
            <column name="category">Примеси за хоросан и бетон</column>
        </table>
        <table name="product_prices">
            <column name="code">1459</column>
            <column name="name">B STRATOS 6</column>
            <column name="packing">0.35</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">17.48</column>
            <column name="category">Фибри от полипропилен</column>
        </table>
        <table name="product_prices">
            <column name="code">1456</column>
            <column name="name">B STRATOS 20</column>
            <column name="packing">0.6</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">28.60</column>
            <column name="category">Фибри от полипропилен</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">FIBERMESH 6130 - цена на торба</column>
            <column name="packing">0.9</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">11.95</column>
            <column name="category">Примеси за хоросан и бетон</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">SAT -FIBER - цена на торба</column>
            <column name="packing">0.75</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">14.80</column>
            <column name="category">Примеси за хоросан и бетон</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">SAT -FILS - цена на торба</column>
            <column name="packing">0.6</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">9.28</column>
            <column name="category">Примеси за хоросан и бетон</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">SATECMA -FIBERS - цена на торба</column>
            <column name="packing">0.6</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">3.26</column>
            <column name="category">Примеси за хоросан и бетон</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">SATECMACONS AAJ</column>
            <column name="packing">10, 25</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">7.02</column>
            <column name="category">Продукти против покачваща влага</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">SATECMACONS V</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">47.58</column>
            <column name="category">Примеси за хоросан и бетон</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA -ANTISAL</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">6.06</column>
            <column name="category">Примеси за хоросан и бетон</column>
        </table>
        <table name="product_prices">
            <column name="code">3150</column>
            <column name="name">HIDROTECMA</column>
            <column name="packing">6, 12, 30</column>
            <column name="quantity">1, , </column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">8.02</column>
            <column name="category">Продукти против покачваща влага</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA SOL E</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">5.90</column>
            <column name="category">Разтворители</column>
        </table>
        <table name="product_prices">
            <column name="code">1759</column>
            <column name="name">TECMA SOL C</column>
            <column name="packing">5, 10, 25</column>
            <column name="quantity">2, , </column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">5.80</column>
            <column name="category">Разтворители</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA SOL D</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">8.62</column>
            <column name="category">Разтворители</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA SOL U</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">7.24</column>
            <column name="category">Разтворители</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA SOL UP</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">8.54</column>
            <column name="category">Разтворители</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA SOL BTA</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">5.30</column>
            <column name="category">Разтворители</column>
        </table>
        <table name="product_prices">
            <column name="code">1771</column>
            <column name="name">TECMA SOL AP</column>
            <column name="packing">1, 5, 10, 25</column>
            <column name="quantity">1, 1, 1, </column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">7.56</column>
            <column name="category">Разтворители</column>
        </table>
        <table name="product_prices">
            <column name="code">1331</column>
            <column name="name">SOLQUIM TAR</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">5.88</column>
            <column name="category">Разтворители</column>
        </table>
        <table name="product_prices">
            <column name="code">1755</column>
            <column name="name">TECMA PAINT R</column>
            <column name="packing">5</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">37.98</column>
            <column name="category">Свързващи пълнители от смоли</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA PAINT AD</column>
            <column name="packing">1, 2, 5</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">36.72</column>
            <column name="category">Свързващи пълнители от смоли</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA ADH</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">6.68</column>
            <column name="category">Свързващи пълнители от смоли</column>
        </table>
        <table name="product_prices">
            <column name="code">1908</column>
            <column name="name">TECMA OXID ND</column>
            <column name="packing">1, 5, 10</column>
            <column name="quantity">, 7, </column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">15.80</column>
            <column name="category">Специални бои</column>
        </table>
        <table name="product_prices">
            <column name="code">1719</column>
            <column name="name">TECMA PAINT OX GREY</column>
            <column name="packing">2, 5</column>
            <column name="quantity">, 7</column>
            <column name="unit">кг.</column>
            <column name="color">сив</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">13.40</column>
            <column name="category">Специални бои</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA PAINT OP YELLOW</column>
            <column name="packing">5, 10</column>
            <column name="unit">кг.</column>
            <column name="color">жълт</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">22.16</column>
            <column name="category">Специални бои</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA PAINT OP RED</column>
            <column name="packing">5, 10</column>
            <column name="unit">кг.</column>
            <column name="color">червен</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">19.04</column>
            <column name="category">Специални бои</column>
        </table>
        <table name="product_prices">
            <column name="code">1745</column>
            <column name="name">TECMA PAINT HS BLUE</column>
            <column name="packing">5, 10, 25</column>
            <column name="quantity">2, 5, </column>
            <column name="unit">кг.</column>
            <column name="color">син</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">12.06</column>
            <column name="category">Специални бои</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA PAINT OP-D</column>
            <column name="packing">5, 10</column>
            <column name="unit">кг.</column>
            <column name="color">сив</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">13.46</column>
            <column name="category">Специални бои</column>
        </table>
        <table name="product_prices">
            <column name="code">1730</column>
            <column name="name">TECMA PAINT OPS WHITE</column>
            <column name="packing">12, 25, 30</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">12.40</column>
            <column name="category">Специални бои</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA PAINT P</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">20.64</column>
            <column name="category">Специални бои</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">DECAOX SP</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">12.54</column>
            <column name="category">Специални бои</column>
        </table>
        <table name="product_prices">
            <column name="code">4538</column>
            <column name="name">TECMA PAINT NO FROST</column>
            <column name="packing">5, 10, 20</column>
            <column name="quantity">7, , </column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">13.58</column>
            <column name="category">Специални бои</column>
        </table>
        <table name="product_prices">
            <column name="code">1040</column>
            <column name="name">AER. TECMA PANIT METALZIADOR Z 0.65L</column>
            <column name="packing">1</column>
            <column name="unit">бр.</column>
            <column name="quantity">1</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">23.22</column>
            <column name="category">Специални бои</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA INOX SPRAY (AEROSOL)</column>
            <column name="packing">1</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">24.64</column>
            <column name="category">Специални бои</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">AEROSOL SENAL PAINT OP</column>
            <column name="packing">1</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">23.82</column>
            <column name="category">Специални бои</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA PAINT EI</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">22.94</column>
            <column name="category">Епоксидни бои</column>
        </table>
        <table name="product_prices">
            <column name="code">4109</column>
            <column name="name">TECMA PAINT AH</column>
            <column name="packing">5</column>
            <column name="quantity">6</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">23.46</column>
            <column name="category">Епоксидни бои</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">IMPRIMACION E-2 EPOXIDICA</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">11.50</column>
            <column name="category">Епоксидни бои</column>
        </table>
        <table name="product_prices">
            <column name="code">4156</column>
            <column name="name">TECMA PAINT ECOTRANS</column>
            <column name="packing">7</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">18.64</column>
            <column name="category">Епоксидни бои</column>
        </table>
        <table name="product_prices">
            <column name="code">1779</column>
            <column name="name">TECMA PAINT ECOPOX WHITE</column>
            <column name="packing">5</column>
            <column name="quantity">4</column>
            <column name="unit">кг.</column>
            <column name="color">бял</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">17.16</column>
            <column name="category">Епоксидни бои</column>
        </table>
        <table name="product_prices">
            <column name="code">1935</column>
            <column name="name">TECMA PAINT EP-SD GREY</column>
            <column name="packing">6</column>
             <column name="quantity">2</column>
            <column name="unit">кг.</column>
            <column name="color">сив</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">23.34</column>
            <column name="category">Епоксидни бои</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA PAINT AUTONIVEL. GREY (with sand)</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color">сив</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">9.04</column>
            <column name="category">Епоксидни бои</column>
        </table>
        <table name="product_prices">
            <column name="code">1914</column>
            <column name="name">TECMA PAINT AUTONIVEL. GREY (concentrate)</column>
            <column name="packing">12.5</column>
            <column name="unit">кг.</column>
            <column name="color">сив</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">21.58</column>
            <column name="category">Епоксидни бои</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">HIDROTECMA SP</column>
            <column name="packing">25</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">9.92</column>
            <column name="category">Обработка на подове и настилки</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">OLEOREPELENTE BS</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">31.56</column>
            <column name="category">Обработка на подове и настилки</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA GEM AEROSOL</column>
            <column name="packing">1</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">10.30</column>
            <column name="category">Обработка на подове и настилки</column>
        </table>
        <table name="product_prices">
            <column name="code">1940</column>
            <column name="name">TECMA PAINT PU-EXT GREY</column>
            <column name="packing">6, 12</column>
            <column name="quantity">, 10</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">22.26</column>
            <column name="category">Обработка на подове и настилки</column>
        </table>
        <table name="product_prices">
            <column name="code">4413</column>
            <column name="name">TECMA PAINT BPU MATT</column>
            <column name="packing">4</column>
            <column name="quantity">1</column>
            <column name="unit">кг.</column>
            <column name="color">мат</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">26.18</column>
            <column name="category">Обработка на подове и настилки</column>
        </table>
        <table name="product_prices">
            <column name="code">4117</column>
            <column name="name">TECMA PAINT BPU GLOSS</column>
            <column name="packing">4</column>
            <column name="unit">кг.</column>
            <column name="color">гланц</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">26.18</column>
            <column name="category">Обработка на подове и настилки</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA RSE</column>
            <column name="packing">5</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">20.62</column>
            <column name="category">Обработка на подове и настилки</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA PAV 13</column>
            <column name="packing">5</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">4.74</column>
            <column name="category">Обработка на подове и настилки</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">LICOGLAS</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">5.22</column>
            <column name="category">Обработка на подове и настилки</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA SEC ABS</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">3.44</column>
            <column name="category">Обработка на подове и настилки</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA ABSORB +</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">0.00</column>
            <column name="category">Обработка на подове и настилки</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">KIT DE ABSORCION S</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">48.74</column>
            <column name="category">Обработка на подове и настилки</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA AGLOMER</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">13.10</column>
            <column name="category">Обработка на подове и настилки</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA AGLOMER PUR</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">18.30</column>
            <column name="category">Обработка на подове и настилки</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA AGLOMER PUR AL</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">22.88</column>
            <column name="category">Обработка на подове и настилки</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA SUELOS WAX</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">3.02</column>
            <column name="category">Обработка на подове и настилки</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA MOP</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">6.54</column>
            <column name="category">Обработка на подове и настилки</column>
        </table>
        <table name="product_prices">
            <column name="code">1645</column>
            <column name="name">TECMA AGLO STONE</column>
            <column name="packing">0.75, 5</column>
            <column name="quantity">, 61</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">17.64</column>
            <column name="category">Обработка на подове и настилки</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA AGLO STONE PA</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">22.92</column>
            <column name="category">Обработка на подове и настилки</column>
        </table>
        <table name="product_prices">
            <column name="code">1417</column>
            <column name="name">TECMA ANTIDESLIZANTE</column>
            <column name="packing">1, 5, 10, 25</column>
            <column name="unit">л.</column>
            <column name="quantity">1, , , </column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">9.94</column>
            <column name="category">Обработка на подове и настилки</column>
        </table>
        <table name="product_prices">
            <column name="code">1404</column>
            <column name="name">DESCA 2F</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">2.26</column>
            <column name="category">Цименто-почистващи препарати</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">DESCA 2F/P</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">2.96</column>
            <column name="category">Цименто-почистващи препарати</column>
        </table>
        <table name="product_prices">
            <column name="code">1437</column>
            <column name="name">DESCA 100</column>
            <column name="packing">6, 12, 30</column>
            <column name="quantity"> 1, , 1</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">5.34</column>
            <column name="category">Цименто-почистващи препарати</column>
        </table>
        <table name="product_prices">
            <column name="code">1413</column>
            <column name="name">DESCA P</column>
            <column name="packing">5, 10, 25</column>
            <column name="quantity">4, , </column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">10.34</column>
            <column name="category">Цименто-почистващи препарати</column>
        </table>
        <table name="product_prices">
            <column name="code">1405</column>
            <column name="name">SUPER DESCA</column>
            <column name="packing">6, 12, 30</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">10.66</column>
            <column name="category">Цименто-почистващи препарати</column>
        </table>
        <table name="product_prices">
            <column name="code">4132</column>
            <column name="name">SUPER DESCA STONE</column>
            <column name="packing">6, 12, 30</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">10.30</column>
            <column name="category">Цименто-почистващи препарати</column>
        </table>
        <table name="product_prices">
            <column name="code">1401</column>
            <column name="name">DESCA HOR</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">2.54</column>
            <column name="category">Цименто-почистващи препарати</column>
        </table>
        <table name="product_prices">
            <column name="code">1440</column>
            <column name="name">DESCA S</column>
            <column name="packing">5, 10, 25</column>
            <column name="quantity">2, , </column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">2.32</column>
            <column name="category">Цименто-почистващи препарати</column>
        </table>
         <table name="products_storage">
            <column name="code">1031</column>
            <column name="name">TECMA GUARD GRD</column>
            <column name="package">5</column>
            <column name="quantity">6</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">0</column>
            <column name="category">Други</column>
        </table>
        <table name="product_prices">
            <column name="code">1317</column>
            <column name="name">PROQUIL GRAS</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">7.74</column>
            <column name="category">Общопочистващи препарати</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">PROQUIL B</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">7.02</column>
            <column name="category">Общопочистващи препарати</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">PROQUIL CRISTAL</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">5.76</column>
            <column name="category">Общопочистващи препарати</column>
        </table>
        <table name="product_prices">
            <column name="code">1347</column>
            <column name="name">PROQUIL AL</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">7.08</column>
            <column name="category">Общопочистващи препарати</column>
        </table>
        <table name="product_prices">
            <column name="code">1324</column>
            <column name="name">PROQUIL 15</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">10.02</column>
            <column name="category">Общопочистващи препарати</column>
        </table>
        <table name="product_prices">
            <column name="code">1369</column>
            <column name="name">PROQUIL ALCA</column>
            <column name="packing">6, 12, 30</column>
            <column name="unit">кг.</column>
            <column name="quantity">1, , 1</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">5.44</column>
            <column name="category">Общопочистващи препарати</column>
        </table>
        <table name="product_prices">
            <column name="code">1484</column>
            <column name="name">PROQUIL SMOKE</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">7.26</column>
            <column name="category">Общопочистващи препарати</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">PROQUIL PLUS</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">9.42</column>
            <column name="category">Общопочистващи препарати</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">PROQUIL AMON NF</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">7.84</column>
            <column name="category">Общопочистващи препарати</column>
        </table>
        <table name="product_prices">
            <column name="code">1314</column>
            <column name="name">PROQUIL CAR</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">6.30</column>
            <column name="category">Общопочистващи препарати</column>
        </table>
        <table name="product_prices">
            <column name="code">1498</column>
            <column name="name">PROQUIL CAN 0.5L</column>
            <column name="packing">1</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">16.70</column>
            <column name="category">Общопочистващи препарати</column>
        </table>
        <table name="product_prices">
            <column name="code">8048</column>
            <column name="name">TECMA SILVER</column>
            <column name="packing">1</column>
            <column name="unit">л.</column>
            <column name="quantity">60</column>
            <column name="color"></column>
            <column name="percentage_increase">2.50</column>
            <column name="price">11.36</column>
            <column name="category">Общопочистващи препарати</column>
        </table>
        <table name="product_prices">
            <column name="code">8334</column>
            <column name="name">TECMA EOT</column>
            <column name="packing">1</column>
            <column name="unit">л.</column>
            <column name="quantity">1</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">10.04</column>
            <column name="category">Общопочистващи препарати</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">HUM PROT MATE</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">14.18</column>
            <column name="category">Фасадни водоотблъскващи препарати</column>
        </table>
        <table name="product_prices">
            <column name="code">1752</column>
            <column name="name">IMPERMEABILIZANTE 10AG</column>
            <column name="packing">5, 10, 25</column>
            <column name="quantity">, 6, </column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">19.70</column>
            <column name="category">Фасадни водоотблъскващи препарати</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">HUMPROT HYDRO</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">12.56</column>
            <column name="category">Фасадни водоотблъскващи препарати</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">HUM PROT AQUA</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">12.48</column>
            <column name="category">Фасадни водоотблъскващи препарати</column>
        </table>
        <table name="product_prices">
            <column name="code">4210</column>
            <column name="name">TECMA PAINT FACH. WHITE</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">кг.</column>
            <column name="color">бял</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">7.50</column>
            <column name="category">Фасадни водоотблъскващи бои</column>
        </table>
        <table name="product_prices">
            <column name="code">4243</column>
            <column name="name">TECMA PAINT SILICATO AMARILLO SAHARA</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">кг.</column>
            <column name="color">сахара</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">6.22</column>
            <column name="category">Фасадни водоотблъскващи бои</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMACRIL FACHADAS</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">4.62</column>
            <column name="category">Фасадни водоотблъскващи бои</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMACRIL 09</column>
            <column name="packing">25</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">4.18</column>
            <column name="category">Фасадни водоотблъскващи бои</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMALITE FACHADAS</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">8.18</column>
            <column name="category">Фасадни водоотблъскващи бои</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMASIL PRIMER</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">6.18</column>
            <column name="category">Фасадни водоотблъскващи бои</column>
        </table>
        <table name="product_prices">
            <column name="code">1710</column>
            <column name="name">TECMA PAINT AS GREY</column>
            <column name="packing">5, 10 ,25</column>
            <column name="quantity">1, 1, </column>
            <column name="unit">кг.</column>
            <column name="color">сив</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">18.96</column>
            <column name="category">Фасадни водоотблъскващи бои</column>
        </table>
        <table name="product_prices">
            <column name="code">4181</column>
            <column name="name">TECMA PAINT BREAK TERMIC</column>
            <column name="packing">5, 10, 20</column>
            <column name="quantity">, 1, </column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">12.98</column>
            <column name="category">Фасадни водоотблъскващи бои</column>
        </table>
        <table name="product_prices">
            <column name="code">1530</column>
            <column name="name">IMPERMEABILIZANTE E 88 GREY</column>
            <column name="packing">5, 10, 25</column>
            <column name="quantity">, , 1</column>
            <column name="unit">кг.</column>
            <column name="color">сив</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">8.40</column>
            <column name="category">Хидроизолация и защита на покриви</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA BASS SH</column>
            <column name="packing">6, 12, 30</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">8.32</column>
            <column name="category">Хидроизолация и защита на покриви</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA ELAST V 97</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">6.36</column>
            <column name="category">Хидроизолация и защита на покриви</column>
        </table>
        <table name="product_prices">
            <column name="code">4412</column>
            <column name="name">TECMA ECO TR</column>
            <column name="packing">5, 10, 25</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">14.50</column>
            <column name="category">Хидроизолация и защита на покриви</column>
        </table>
        <table name="product_prices">
            <column name="code">1597</column>
            <column name="name">TECMA IMPERAL P2008 GREY</column>
            <column name="packing">10</column>
            <column name="quantity">2</column>
            <column name="unit">кг.</column>
            <column name="color">сив</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">13.02</column>
            <column name="category">Хидроизолация и защита на покриви</column>
        </table>
        <table name="product_prices">
            <column name="code">1536</column>
            <column name="name">TECMA IMPERAL P 91</column>
            <column name="packing">5, 10</column>
            <column name="quantity">, 4</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">19.58</column>
            <column name="category">Хидроизолация и защита на покриви</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMA IMPERAL P 98</column>
            <column name="packing">5, 10</column>
            <column name="unit">кг.</column>
            <column name="color">сив</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">19.58</column>
            <column name="category">Хидроизолация и защита на покриви</column>
        </table>
        <table name="product_prices">
            <column name="code">1669</column>
            <column name="name">TECMA IMPERAL H2O GREY</column>
            <column name="packing">1, 5</column>
            <column name="unit">кг.</column>
            <column name="color">сив</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">23.18</column>
            <column name="category">Хидроизолация и защита на покриви</column>
        </table>
        <table name="product_prices">
            <column name="code">1478</column>
            <column name="name">TECMA PAINT FINAL GREY</column>
            <column name="packing">5, 10, 25</column>
            <column name="quantity">, , 3</column>
            <column name="unit">кг.</column>
            <column name="color">сив</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">13.18</column>
            <column name="category">Хидроизолация и защита на покриви</column>
        </table>
        <table name="product_prices">
            <column name="code">1481</column>
            <column name="name">TECMA PAINT FINAL WHITE</column>
            <column name="packing">5, 10, 25</column>
            <column name="quantity">1, 2, </column>
            <column name="unit">кг.</column>
            <column name="color">бял</column>
            <column name="percentage_increase">2.20</column>
            <column name="price">13.64</column>
            <column name="category">Хидроизолация и защита на покриви</column>
        </table>
        <table name="product_prices">
            <column name="code">1540</column>
            <column name="name">TECMA PAINT IT</column>
            <column name="packing">1, 5</column>
            <column name="quantity">1, 4</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">64.26</column>
            <column name="category">Хидроизолация и защита на покриви</column>
        </table>
        <table name="product_prices">
            <column name="code">4198</column>
            <column name="name">TECMA PAINT TERMIC FAHRENHEIT 10.8</column>
            <column name="packing">5, 10, 20</column>
            <column name="quantity">1, 5,</column>
            <column name="unit">л.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">16.96</column>
            <column name="category">Хидроизолация и защита на покриви</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">SATECMA TERMIC</column>
            <column name="packing">60</column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">9.10</column>
            <column name="category">Топло изолация</column>
        </table>
        <table name="product_prices">
            <column name="code">1666</column>
            <column name="name">TECMA LSR NF 1L</column>
            <column name="packing">1</column>
            <column name="quantity">16</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.50</column>
            <column name="price">5.58</column>
            <column name="category">Инсектициди и биоциди</column>
        </table>
        <table name="product_prices">
            <column name="code">1667</column>
            <column name="name">INSECTICIDA AQUA PLUS PULVERIZADOR 0.5L</column>
            <column name="packing">1</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">10.32</column>
            <column name="category">Инсектициди и биоциди</column>
        </table>
        <table name="product_prices">
            <column name="code">1674</column>
            <column name="name">AER. TECMA INSEC SP33 0.65L</column>
            <column name="packing">1</column>
            <column name="unit">бр.</column>
            <column name="quantity">16</column>
            <column name="color"></column>
            <column name="percentage_increase">2.50</column>
            <column name="price">10.30</column>
            <column name="category">Инсектициди и биоциди</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">FILTRO GEOTEXTIL 240gr./m2</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">3.50</column>
            <column name="category">Спомагателни продукти и мемрани</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TELA DE ARMAR</column>
            <column name="packing">1.3</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">2.02</column>
            <column name="category">Спомагателни продукти и мемрани</column>
        </table>
        <table name="product_prices">
            <column name="code">1467</column>
            <column name="name">FIBRA DE ARMAR 100 (M2)</column>
            <column name="packing">1.3</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">3.98</column>
            <column name="category">Спомагателни продукти и мемрани</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">VELO DE REFUERZO</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">3.22</column>
            <column name="category">Спомагателни продукти и мемрани</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">VELO DE REFUERZO 300 P</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">5.08</column>
            <column name="category">Спомагателни продукти и мемрани</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">TECMADREN (2&#039;10 x 20 m)</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">303.40</column>
            <column name="category">Спомагателни продукти и мемрани</column>
        </table>
        <table name="product_prices">
            <column name="code"></column>
            <column name="name">DRENAJE ANTIRAICES</column>
            <column name="packing"></column>
            <column name="unit"></column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">3.58</column>
            <column name="category">Спомагателни продукти и мемрани</column>
        </table>
        <table name="product_prices">
            <column name="code">0200</column>
            <column name="name">BIRDY LIQUID 0.25L</column>
            <column name="packing">1</column>
            <column name="unit">бр.</column>
            <column name="quantity">3</column>
            <column name="color"></column>
            <column name="percentage_increase">2.50</column>
            <column name="price">10.00</column>
            <column name="category">Други</column>
        </table>
        <table name="product_prices">
            <column name="code">1046</column>
            <column name="name">AER. TECMALUB ALM 0.65L</column>
            <column name="packing">1</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">13.98</column>
            <column name="category">Други</column>
        </table>
        <table name="product_prices">
            <column name="code">1028</column>
            <column name="name">AER. CMR ANTIGRIPANTE 0.65L</column>
            <column name="packing">1</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">13.90</column>
            <column name="category">Други</column>
        </table>
        <table name="product_prices">
            <column name="code">8324</column>
            <column name="name">AER. AMB. IMPACTO MENTOLIM</column>
            <column name="packing">1</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">11.98</column>
            <column name="category">Други</column>
        </table>
        <table name="product_prices">
            <column name="code">8369</column>
            <column name="name">AER. AMB. IMPACTO CAFE INTENSO</column>
            <column name="packing">1</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">11.98</column>
            <column name="category">Други</column>
        </table>
        <table name="product_prices">
            <column name="code">8370</column>
            <column name="name">AER. AMB. IMPACTO CANELA RIZADA</column>
            <column name="packing">1</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">11.98</column>
            <column name="category">Други</column>
        </table>
        <table name="product_prices">
            <column name="code">1300</column>
            <column name="name">TECMA OFF C19 1L</column>
            <column name="packing">1</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">12.92</column>
            <column name="category">Други</column>
        </table>
        <table name="product_prices">
            <column name="code">1070</column>
            <column name="name">AER. TECMA CLEAN GRASS 0.65L</column>
            <column name="packing">1</column>
            <column name="unit">бр.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">8.30</column>
            <column name="category">Други</column>
        </table>
        <table name="product_prices">
            <column name="code">517</column>
            <column name="name">KIT BIO S</column>
            <column name="packing">1</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">42.54</column>
            <column name="category">Други</column>
        </table>
        <table name="product_prices">
            <column name="code">1659</column>
            <column name="name">MAXIRAT BD-3</column>
            <column name="packing">25</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">6.30</column>
            <column name="category">Други</column>
        </table>
        <table name="product_prices">
            <column name="code">1660</column>
            <column name="name">MAXIRAT BD-3 BLOQUE</column>
            <column name="packing">10</column>
            <column name="unit">кг.</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">13.28</column>
            <column name="category">Други</column>
        </table>
        <table name="product_prices">
            <column name="code">1010</column>
            <column name="name">AER. PROT VINIL 0.65L</column>
            <column name="packing">1</column>
            <column name="unit">бр.</column>
            <column name="quantity">1</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">6.96</column>
            <column name="category">Други</column>
        </table>
        <table name="product_prices">
            <column name="code">1075</column>
            <column name="name">AEROSOL ALUD</column>
            <column name="packing">1</column>
            <column name="unit">бр.</column>
            <column name="quantity">1</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">10.36</column>
            <column name="category">Други</column>
        </table>
        <table name="product_prices">
            <column name="code">1681</column>
            <column name="name">TECMA BAC CLEANER 1L</column>
            <column name="packing">1</column>
            <column name="unit">бр.</column>
            <column name="quantity">1</column>
            <column name="color"></column>
            <column name="percentage_increase">2.20</column>
            <column name="price">4.86</column>
            <column name="category">Други</column>
        </table>
    </database>
`;

// Parse the XML string into a DOM object
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlString, "text/xml");

// Function to make adjustments to the XML data
function adjustXMLData(xmlDoc) {
  const tables = xmlDoc.getElementsByTagName("table");
  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    const columns = table.getElementsByTagName("column");

    const hasQuantity = Array.from(columns).some(
      (column) => column.getAttribute("name") === "quantity"
    );
    if (!hasQuantity) {
      const quantityColumn = xmlDoc.createElement("column");
      quantityColumn.setAttribute("name", "quantity");
      quantityColumn.textContent = "0";
      table.appendChild(quantityColumn);
    }

    // Example adjustment: set default values for empty columns
    for (let j = 0; j < columns.length; j++) {
      const column = columns[j];
      if (!column.textContent) {
        if (column.getAttribute("name") === "quantity") {
          column.textContent = "0";
        } else if (column.getAttribute("name") === "code") {
          column.textContent = null;
        }
      }
    }
  }
}

// Adjust the XML data
adjustXMLData(xmlDoc);

// Serialize the DOM object back into an XML string
const serializer = new XMLSerializer();
const newXmlString = serializer.serializeToString(xmlDoc);

// Write the modified XML string to a file
fs.writeFile("modified.xml", newXmlString, (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});