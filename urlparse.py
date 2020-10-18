from rfc3987 import parse

class urlParse():
    def __init__(self, usermessage):
        self.message=usermessage
    
    def checkURL(self):
        messageList=self.message.split()
        picimages=["jpg","png","gif"]
        rtnMessage=''
        for message in messageList:
            try:
                parsedinfo=parse(message,rule='IRI')
                print(parsedinfo.get('scheme'))
                urlpic=parsedinfo.get('path')
                if (any(pic in urlpic for pic in picimages)):
                    picRtn='<img src="'
                    picRtn+=message
                    picRtn+='"> '
                    rtnMessage+=picRtn
                else:
                    atag='<a href="'
                    atag+=message
                    atag+='">'
                    atag+=message
                    atag+='</a> '
            except:
                rtnMessage+=message
                rtnMessage+= " "
        return rtnMessage
            