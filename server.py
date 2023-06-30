from flask import Flask, render_template, request, redirect, url_for, flash
import shelve

app = Flask(__name__)
app.secret_key = 'pingpong'

shelve_file = shelve.open('pingpong')

try:
    jogadores = shelve_file['jogadores']
except:
    jogadores = []

@app.route('/')
def index():
    global jogadores
    jogadores.sort(reverse=True, key=get_rating)
    return render_template('index.html', titulo='Ranqueada do Pingue-Pongue', jogadores=jogadores)

@app.route('/add')
def adicionar():
    return render_template('add.html', titulo='Adicionar Levvado')

@app.route('/process_add', methods=['GET', 'POST'])
def processar_add():
    nome = request.form['nome']
    if nome == '':
        flash('Nome vazio, Zé!', 'error')
        return redirect(url_for('adicionar'))
    new_player = {'nome': nome, 'rating': '1000',  'forma': '', 'wins': []}
    jogadores.append(new_player)
    shelve_file['jogadores'] = jogadores
    return redirect(url_for('index'))

@app.route('/post_results', methods = ['GET', 'POST'])
def get_post_javascript_data():
    global jogadores
    vencedor = request.form['vencedor']
    perdedor = request.form['perdedor']
    delta = request.form['delta']

    for jogador in jogadores:
        if jogador['nome'] == vencedor:
            jogador['rating'] = int(jogador['rating']) + int(delta)
        if jogador['nome'] == perdedor:
            jogador['rating'] = int(jogador['rating']) - int(delta)

    shelve_file['jogadores'] = jogadores
    return redirect(url_for('index'))

def get_rating(jogador):
    return int(jogador['rating'])

app.run(debug=True)
