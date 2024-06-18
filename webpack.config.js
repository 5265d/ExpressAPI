const path = require('path');
require("dotenv").config();
/**
 * Configuração do Webpack para empacotar o código JavaScript.
 * Este arquivo define a entrada (entry) e saída (output) do webpack,
 * além de configurar o servidor de desenvolvimento (devServer) e
 * as regras (rules) para lidar com diferentes tipos de arquivos.
 */

module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js', 
        path: path.resolve(__dirname, 'dist'), 
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'), // Diretório estático para servir arquivos HTML, CSS, etc...
        },
        compress: true, // Habilita a compressão
        port: process.env.PORT_WEB, // Porta para o servidor de desenvolvimento
        proxy: [
            {
                context: ['/api'], // URLs que serão redirecionadas para o servidor back-end
                target: `http://${process.env.AUTIP}:${process.env.PORT}`, // URL do servidor back-end
                secure: false, // Define se a conexão é segura (HTTPS)
                changeOrigin: true, // Altera o cabeçalho de origem da requisição
            },
        ],
    },
    module: {
        rules: [
            {
                test: /\.html$/, // Regra para arquivos HTML
                use: [
                    {
                        loader: 'html-loader', // Loader para processar arquivos HTML
                    },
                ],
            },
        ],
    },
};
