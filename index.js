// OBS NAO FUI EU QUEM CRIO ESTE BOT SO FIZ TRADUZIR E ADICIONEI ALGUNS COMANDO DE MÚSICA APENAS NAO VEM COPIAR E DIZER QUE FOI VC QUE FEZ CRÉDITOS AO XEON
const {
   spawn
} = require('child_process')
const path = require('path')

function start() {
   let args = [path.join(__dirname, 'main.js'), ...process.argv.slice(2)]
   console.log([process.argv[0], ...args].join('\n'))
   let p = spawn(process.argv[0], args, {
         stdio: ['inherit', 'inherit', 'inherit', 'ipc']
      })
      .on('message', data => {
         if (data == 'reset') {
            console.log('Reiniciando o bot...')
            p.kill()
            start()
            delete p
         }
      })
      .on('exit', code => {
         console.error('🔌  Saiu com código:', code)
         if (code == '.' || code == 1 || code == 0) start()
      })
}
start()
