from flask import Flask, request, jsonify
from PIL import Image
import io

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    
    try:
        image = Image.open(io.BytesIO(file.read()))
        result = "Healthy"  # Replace this with actual prediction logic
        return jsonify({"result": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
