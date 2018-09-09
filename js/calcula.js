(function ($) {

    'use strict';
    hideElement('result');
    document.querySelector('#carga').focus();

    let vergalhao = [
        {'bitola' : 6.3, 'as' : 0.311},
        {'bitola' : 8.0, 'as' : 0.50},
        {'bitola' : 10.0, 'as' : 0.78},
        {'bitola' : 12.5, 'as' : 1.23},
        {'bitola' : 16.0, 'as' : 2.01},
        {'bitola' : 20.0, 'as' : 3.14},
        {'bitola' : 25.0, 'as' : 4.9},
        {'bitola' : 32.0, 'as' : 8.04},
        {'bitola' : 40.0, 'as' : 19.63},
    ];

    document.querySelector('#form-viga').addEventListener('submit', evt => {

        evt.preventDefault();
        calcula();
        showElement('result');
        hideElement('data');
        /* let canvas = document.getElementById('canvas');
        let base = document.querySelector('#base').value;
        let height = document.querySelector('#altura').value;
        desenha(canvas,base, height); */
    });

    document.querySelector('#reset').addEventListener('click', evt => {
        evt.preventDefault();
        showElement('data');
        hideElement('result');
    });
    
    function calcula() {
        let qi = parseFloat(document.querySelector('#carga').value);
        let l = parseFloat(document.querySelector('#vao').value);
        let aco = parseFloat(document.querySelector('#aco').value);
        let concreto = parseFloat(document.querySelector('#concreto').value);
        let base = parseFloat(document.querySelector('#base').value);
        let height = parseFloat(document.querySelector('#altura').value);
        let d = height - 3.0;
        
        console.log(`Carga: ${qi} - l: ${l}, aco: ${aco}, conc: ${concreto}, b: ${base}, h: ${height}, d: ${d}`);

        /* First Step */
        console.log("Passo 1");
        let base_cm = base/100.0; let height_cm = height/100.0;
        let aux = (base_cm * height_cm) * 2500;
        let carga = qi + aux;
        document.querySelector('#resultCarga').innerHTML = `<strong>Carga Total</strong>: ${carga.toFixed(2)} kgf/m`;
        console.log(`O valor de "q" é ${carga.toFixed(2)} kgf/m`);
        
        /* Second Step */
        console.log("Passo 2");
        let mc = (carga * l) / 2.0;
        let mf = (carga * Math.pow(l, 2)) / 8.0;
        document.querySelector('#resultEsforco').innerHTML = `<strong>Esforço cortante:</strong> ${mc.toFixed(2)} kgf`;
        console.log(`Esforço cortante: ${mc.toFixed(2)} kgf`);
        document.querySelector('#resultFletor').innerHTML = `<strong>Momento máx. fletor:</strong> ${mf.toFixed(2)} kgf/m²`;
        console.log(`Momento máx. fletor: ${mf.toFixed(2)} kgf/m²`);

        /* Third Step */
        console.log('Passo 3');
        let c_limite = (concreto * 10.0) * 0.14;
        let mk = mf * 100;
        let c = mk / (base * Math.pow(d, 2));
        document.querySelector('#resultCLimite').innerHTML = `<strong>Valor Limite de C:</strong> ${c_limite.toFixed(2)}`;
        console.log(`Valor de C_Limite: ${c_limite.toFixed(2)}`);
        document.querySelector('#resultCCalc').innerHTML = `<strong>Valor Calculado de C:</strong> ${c.toFixed(2)}`;
        console.log(`Valor de C: ${c.toFixed(2)}`);
        if (c > c_limite) {
            document.querySelector('#resultCCL').innerHTML = '<strong>Verficação de Dimensão:</strong> <span class="label label-danger">Falhou</span>';
            console.log("Verficação de dimensão falhou! C > C_Limite");
            return false;
        }
        document.querySelector('#resultCCL').innerHTML = '<strong>Verficação de Dimensão:</strong> <span class="label label-success">OK</span>';
        console.log("Verficação de dimensão OK! C < C_Limite");

        /* Fourth Step */
        console.log('Passo 4');
        let as = (2.0 * mk) / ((aco * 10) * d);
        document.querySelector('#resultAS').innerHTML = `<strong>Área de aço:</strong> ${as.toFixed(2)} cm²`;
        console.log(`Área de aço: ${as.toFixed(2)} cm²`);
        
        document.querySelector('#bit-6').innerHTML = (Math.ceil(as/vergalhao[0].as) > 1)? `${Math.ceil(as/vergalhao[0].as)} barras de ${vergalhao[0].bitola} mm` : `2 barras* de ${vergalhao[0].bitola} mm`;
        document.querySelector('#bit-8').innerHTML = (Math.ceil(as/vergalhao[1].as) > 1)? `${Math.ceil(as/vergalhao[1].as)} barras de ${vergalhao[1].bitola} mm` : `2 barras* de ${vergalhao[1].bitola} mm`;
        document.querySelector('#bit-10').innerHTML = (Math.ceil(as/vergalhao[2].as) > 1)? `${Math.ceil(as/vergalhao[2].as)} barras de ${vergalhao[2].bitola} mm` : `2 barras* de ${vergalhao[2].bitola} mm`;
        document.querySelector('#bit-12').innerHTML = (Math.ceil(as/vergalhao[3].as) > 1)? `${Math.ceil(as/vergalhao[3].as)} barras de ${vergalhao[3].bitola} mm` : `2 barras* de ${vergalhao[3].bitola} mm`;
        document.querySelector('#bit-16').innerHTML = (Math.ceil(as/vergalhao[4].as) > 1)? `${Math.ceil(as/vergalhao[4].as)} barras de ${vergalhao[4].bitola} mm` : `2 barras* de ${vergalhao[4].bitola} mm`;
        document.querySelector('#bit-20').innerHTML = (Math.ceil(as/vergalhao[5].as) > 1)? `${Math.ceil(as/vergalhao[5].as)} barras de ${vergalhao[5].bitola} mm` : `2 barras* de ${vergalhao[5].bitola} mm`;
        document.querySelector('#bit-25').innerHTML = (Math.ceil(as/vergalhao[6].as) > 1)? `${Math.ceil(as/vergalhao[6].as)} barras de ${vergalhao[6].bitola} mm` : `2 barras* de ${vergalhao[6].bitola} mm`;
        document.querySelector('#bit-32').innerHTML = (Math.ceil(as/vergalhao[7].as) > 1)? `${Math.ceil(as/vergalhao[7].as)} barras de ${vergalhao[7].bitola} mm` : `2 barras* de ${vergalhao[7].bitola} mm`;
        document.querySelector('#bit-40').innerHTML = (Math.ceil(as/vergalhao[8].as) > 1)? `${Math.ceil(as/vergalhao[8].as)} barras de ${vergalhao[8].bitola} mm` : `2 barras* de ${vergalhao[8].bitola} mm`;
        for(let key in vergalhao) {
            let bars = Math.ceil(as/vergalhao[key].as);
            (bars > 1)? console.log(`${vergalhao[key].bitola} mm =>  ${bars} barras`) : console.log(`${vergalhao[key].bitola} mm =>  2 barras*`);
        }
    }

    function desenha(canvas, base, height) {
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = 'grey';
        ctx.fillRect(0, 0, base*10, height*10);
    }

    function showElement(e) {
        document.getElementById(e).style.display = 'block';
        document.getElementById(e).scrollIntoView();
    }
    
    function hideElement(e) {
        document.getElementById(e).style.display = 'none';
    }

}(jQuery));