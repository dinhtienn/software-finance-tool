from flask import *
from gmail import *

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/feedback', methods=['POST'])
def feedback():
  gmail = GMail('llovebeatt@gmail.com','L0veI3ea1')
  html_content = request.data.decode("utf-8").split('":"', 1)[1].replace('"}', '')
  msg = Message('Finance Tool Feedback', to='dinhtiennguyen.1202@gmail.com', html=html_content)
  gmail.send(msg)
  return 'success'

if __name__ == '__main__':
  app.run(debug=True)