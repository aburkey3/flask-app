# AVN Test app - flask application

from flask import Flask, render_template, request
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("home.html")

@app.route("/save", methods=["POST"])
def save():
    try: 
        textInput = request.json["text"]
        with open("tmp/test.txt", "a") as f:
            f.write(textInput)
            f.write("\n")
        return "Request Successful", 200
    except Exception as e:
        print(e)
        return "Request Unsuccessful", 400


@app.route("/load")
def load():
    try:
        data = []
        with open("tmp/test.txt", "r") as f:
            data = f.read().split("\n")[:-1]
        return {"list": data}, 200
    except Exception as e:
        print(e)
        return "Request Unsuccessful", 500

if __name__ == "__main__":
    app.run(debug=True, port=5150)