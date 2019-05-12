import mongoengine

# mongodb://finance:zozozo12298@ds155616.mlab.com:55616/finance

host = "ds155616.mlab.com"
port = 55616
db_name = "finance"
user_name = "finance"
password = "zozozo12298"

def connect():
    mongoengine.connect(
        db_name, 
        host=host, 
        port=port, 
        username=user_name, 
        password=password
    )