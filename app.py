from flask import *
from gmail import *
from mongoengine import *
from feedback import Feedback
import mlab

app = Flask(__name__)
mlab.connect()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/feedback', methods=['POST'])
def feedback():
  # gmail = GMail('tiennguyendinh.1998@gmail.com','neverhate')
  # html_content = request.data.decode("utf-8").split('":"', 1)[1].replace('"}', '')
  # msg = Message('Finance Tool Feedback', to='dinhtiennguyen.1202@gmail.com', html=html_content)
  # gmail.send(msg)
  # new_feedback = Feedback(content=request.data.decode("utf-8").split('":"', 1)[1].replace('"}', ''))
  new_feedback = Feedback(content='abc')
  new_feedback.save()
  return 'success'

if __name__ == '__main__':
  app.run(debug=True)