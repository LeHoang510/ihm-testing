# -*- coding: utf-8 -*-
"""
Created on Mon Jul 17 15:35:15 2023

@author: nicol
"""

import flask
from flask_cors import CORS, cross_origin


app = flask.Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'



@app.route('/osur/getxmlnames', methods=['GET'])
@cross_origin()
def xmlList():
    return flask.jsonify(["cydre_inputs", "PARADIS_inputs"])

@app.route('/osur/getxml/PARADIS_inputs', methods=['GET'])
@cross_origin()
def paradis():
    xmlPath="PARADIS_A14_TRANSITION_MATRICE_1000.xml"
    return flask.send_file(xmlPath, mimetype='application/xml')

@app.route('/osur/getxml/cydre_inputs', methods=['GET'])
@cross_origin()
def cydre():
    xmlPath="cydre_params.xml"
    return flask.send_file(xmlPath, mimetype='application/xml')

@app.route('/osur/run_cydre', methods=['POST'])
@cross_origin()
def run_cydre():
    data = flask.request.get_data()
    print(data.decode())
    return flask.jsonify("all good")

if __name__ == '__main__':
    app.run(host='localhost')
