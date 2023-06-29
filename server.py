from flask import Flask, render_template, request, redirect, url_for, flash
import shelve

app = Flask(__name__)
app.secret_key = 'pingpong'

jogadores = [
    {'nome': 'Joaozinho', 'rating': '1100', 'forma': 'W-W-L', 'wins': ['mj', 'mj']},
    {'nome': 'Israel', 'rating': '1005',  'forma': '', 'wins': ['mj2']},
    {'nome': 'Marcelo Tenório', 'rating': '1200',  'forma': 'L-L', 'wins': ['mj']},
]

shelve_file = shelve.open('pingpong')

@app.route('/')
def index():
    return render_template('index.html', titulo='Ranqueada do Pingue-Pongue', jogadores=jogadores)

app.run(debug=True)
