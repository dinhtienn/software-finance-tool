from mongoengine import *

class Feedback(Document):
    content = StringField()