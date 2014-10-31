from suds.client import Client
from suds.xsd.sxbasic import Import

'''
ns = 'http://schemas.xmlsoap.org/soap/encoding/'
location = 'http://schemas.xmlsoap.org/soap/encoding/'
Import.bind(ns, location)

client = Client("https://fun.tel-aviv.gov.il/ExternalWS/Geo.asmx?wsdl")

request_data = client.factory.create("GetNearestStations")
request_data.longtitude=32.0
request_data.langitude=35.0
request_data.radius=100
request_data.maxResults=3

result = client.service.GetNearestStations(request_data)

print result.GetNearestStationsResult

'''

url = 'https://fun.tel-aviv.gov.il/ExternalWS/Geo.asmx?wsdl'
client = Client(url)
client.set_options(port='GeoSoap12')


result = client.service.GetNearestStations(34.769722,32.06425,10,1)
'''result = client.service.GetNearestStationsByName(34.769722,32.06425,10,1)'''

print("CLIENT:")
print(client)




