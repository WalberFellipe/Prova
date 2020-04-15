const express = require('express')

module.exports = {
    store(req,res){
        let { Nome, Cpf, Nasc, Salario, Dependentes, Empregado, TempEmprego, RestSerasa} = req.body;
        Salario = parseFloat(Salario);

        let Limite = 0

        let Hoje = new Date();
        let Idade = Hoje.getFullYear() - Nasc.getFullYear();

        if(new Date(Hoje.getFullYear(), Hoje.getMonth(), Hoje.getDay()) <
            new Date(Hoje.getFullYear(), Nasc.getMonth(), Nasc.getDay())){
                Idade -= 1;
            }

        if (Idade < 18) {
            return Response.status(200).json({message:"Limite não aprovado",valorLimite:Limite});

        }
        else if (RestSerasa == "S" && Empregado == "N"){
            return Response.status(200).json({message:"Limite não aprovado",valorLimite:Limite});

        }
        else if (RestSerasa == "S" && Empregado == "S" && TempEmprego < 6){
            return Response.status(200).json({message:"Limite não aprovado",valorLimite:Limite});

        }

        else if(RestSerasa == "S" && Empregado == "S" && TempEmprego >= 6 && TempEmprego < 12  ){
            Limite = Salario * 0.1 
            return res.status(200).json({
                message: "Limite de 10% do salário bruto disponível",
                valorLimite:Limite
            });           
        }

        else if(RestSerasa == "N" && Empregado == "S" && TempEmprego >= 6 && TempEmprego < 12  ){
            Limite = Salario * 0.2 
            return res.status(200).json({
                message: "Limite de 20% do salário bruto disponível",
                valorLimite:Limite
            });
        }

        else if(RestSerasa == "N" && Empregado == "N"){
            return res.status(200).json({
                message: "Limite de crédito não disponível"
            })
        }

        else if(RestSerasa == "N" && Empregado == "S" && TempEmprego < 6 && TempEmprego < 12 ){
            Limite = Salario * 0.2 
            return res.status(200).json({
                message: "Limite de 20% do salário bruto disponível",
                valorLimite:Limite
            });
        }
        
        else if(RestSerasa == "N" && Empregado == "S" && TempEmprego > 12  ){
            Limite = Salario * 0.3 
            return res.status(200).json({
                message: "Limite de 30% do salário bruto disponível",
                valorLimite:Limite
            });
        }
    }
    

}