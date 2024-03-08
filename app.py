from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def popup():
    return render_template("popup.html")


app.run()