#!/bin/bash

diretorio="../logs"


if [ -d "$diretorio" ]; then

    echo "Limpando conteúdos dos arquivos em $diretorio"

    for arquivo in "$diretorio"/*; do
        if [ -f "$arquivo" ]; then
            echo "Limpando $arquivo"
            > "$arquivo"
        fi
    done

    echo "Limpeza concluída."

else
    echo "Diretório $diretorio não encontrado."
fi
