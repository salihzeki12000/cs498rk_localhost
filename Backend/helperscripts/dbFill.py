#!/usr/bin/env python

"""
 * @file dbFill.py
 * Used in CS498RK MP4 to populate database with randomly generated users and listings.
 *
 * @author Aswin Sivaraman
 * @date Created: Spring 2015
 * @date Modified: Spring 2015
"""

import sys
import getopt
import httplib
import urllib
import json as simplejson
from random import randint
from random import choice
from random import *
from datetime import date
from time import mktime

def usage():
    print 'dbFill.py -u <baseurl> -p <port> -n <numUsers> -l <numListings>'

def getUsers(conn):
    # Retrieve the list of users
    conn.request("GET","""/api/users?filter={"_id":1}""")
    response = conn.getresponse()
    data = response.read()
    d = json.loads(data)

    # Array of user IDs
    users = [str(d['data'][x]['_id']) for x in xrange(len(d['data']))]

    return users

def main(argv):

    # Server Base URL and port
    baseurl = "www.uiucwp.com"
    port = 4000

    # Number of POSTs that will be made to the server
    userCount = 60
    listingCount = 40

    try:
        opts, args = getopt.getopt(argv,"hu:p:n:l:",["url=","port=","users=","listings="])
    except getopt.GetoptError:
        usage()
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-h':
             usage()
             sys.exit()
        elif opt in ("-u", "--url"):
             baseurl = str(arg)
        elif opt in ("-p", "--port"):
             port = int(arg)
        elif opt in ("-n", "--users"):
             userCount = int(arg)
        elif opt in ("-l", "--listings"):
             listingCount = int(arg)

    # Python array containing common first names and last names
    firstNames = ["james","john","robert","michael","william","david","richard","charles","joseph","thomas","christopher","daniel","paul","mark","donald","george","kenneth","steven","edward","brian","ronald","anthony","kevin","jason","matthew","gary","timothy","jose","larry","jeffrey","frank","scott","eric","stephen","andrew","raymond","gregory","joshua","jerry","dennis","walter","patrick","peter","harold","douglas","henry","carl","arthur","ryan","roger","joe","juan","jack","albert","jonathan","justin","terry","gerald","keith","samuel","willie","ralph","lawrence","nicholas","roy","benjamin","bruce","brandon","adam","harry","fred","wayne","billy","steve","louis","jeremy","aaron","randy","howard","eugene","carlos","russell","bobby","victor","martin","ernest","phillip","todd","jesse","craig","alan","shawn","clarence","sean","philip","chris","johnny","earl","jimmy","antonio","danny","bryan","tony","luis","mike","stanley","leonard","nathan","dale","manuel","rodney","curtis","norman","allen","marvin","vincent","glenn","jeffery","travis","jeff","chad","jacob","lee","melvin","alfred","kyle","francis","bradley","jesus","herbert","frederick","ray","joel","edwin","don","eddie","ricky","troy","randall","barry","alexander","bernard","mario","leroy","francisco","marcus","micheal","theodore","clifford","miguel","oscar","jay","jim","tom","calvin","alex","jon","ronnie","bill","lloyd","tommy","leon","derek","warren","darrell","jerome","floyd","leo","alvin","tim","wesley","gordon","dean","greg","jorge","dustin","pedro","derrick","dan","lewis","zachary","corey","herman","maurice","vernon","roberto","clyde","glen","hector","shane","ricardo","sam","rick","lester","brent","ramon","charlie","tyler","gilbert","gene"]
    lastNames = ["smith","johnson","williams","jones","brown","davis","miller","wilson","moore","taylor","anderson","thomas","jackson","white","harris","martin","thompson","garcia","martinez","robinson","clark","rodriguez","lewis","lee","walker","hall","allen","young","hernandez","king","wright","lopez","hill","scott","green","adams","baker","gonzalez","nelson","carter","mitchell","perez","roberts","turner","phillips","campbell","parker","evans","edwards","collins","stewart","sanchez","morris","rogers","reed","cook","morgan","bell","murphy","bailey","rivera","cooper","richardson","cox","howard","ward","torres","peterson","gray","ramirez","james","watson","brooks","kelly","sanders","price","bennett","wood","barnes","ross","henderson","coleman","jenkins","perry","powell","long","patterson","hughes","flores","washington","butler","simmons","foster","gonzales","bryant","alexander","russell","griffin","diaz","hayes"]

    # Server to connect to (1: url, 2: port number)
    conn = httplib.HTTPConnection(baseurl, port)

    # HTTP Headers
    headers = {"Content-type": "application/x-www-form-urlencoded","Accept": "text/plain"}

    # Array of user IDs
    userIDs = []
    userNames = []
    userEmails = []

    # Loop 'userCount' number of times
    for i in xrange(userCount):

        # Pick a random first name and last name
        x = randint(0,99)
        y = randint(0,99)
        gender = "Male" if randint(0, 1) > 0 else "Female"
        params = urllib.urlencode({"name": firstNames[x] + " " + lastNames[y],
                                    "bio": "Lorem ipsum whatever",
                                    "local": {
                                        "email": firstNames[x] + "@" + lastNames[y] + ".com",
                                        "password": firstNames[x]+lastNames[y]+str(randint(0,100))
                                    },
                                    "age": str(randint(20,60)),
                                    "gender" : gender
                                    })

        # POST the user
        conn.request("POST", "/api/users", params, headers)
        response = conn.getresponse()
#        print(response)
#        print("weeeeeeeeeeeeeeee\n")
        #print(response.read())
        data = response.read()
#        print(data);
        sample = '{"message":"User created","data":{"__v":0,"name":"johnny hill","bio":"Lorem ipsum whatever","age":"51","_id":"572a45d1a1d337d809277893","matchedTravelers":[],"local":{"password":"$2a$08$ScdqwN3Hbx/MgCrmw79kleS./Wq/pvZ/c/Hfoqs13cPjod4yS6d8m","email":"johnny@hill.com"}}}';
        d = simplejson.loads(str(data))

        # Store the users id
        userIDs.append(str(d['data']['_id']))
        userNames.append(str(d['data']['name']))
        userEmails.append(str(d['data']['local']['email']))

    # Open 'listings.txt' for sample listing names
    #f = open('listings.txt','r')
    #listingNames = f.read().splitlines()
    cityNames = open('cities.txt', 'r').read().splitlines()
    tagNames = open('tags.txt', 'r').read().splitlines()
    #print(tagNames)
    # Loop 'listingCount' number of times
    for i in xrange(listingCount):

        # Randomly generate listing parameters
        assignedHost = randint(0,len(userIDs)-1)
        assignedHostID = userIDs[assignedHost]
        assignedHostName = userNames[assignedHost]
        assignedHostEmail = userEmails[assignedHost]
        description = "It is a long established fact that a reader will do things yadda yadda."
        bio = "Lorem Ipsum yadda yadda yadda"
        price = randint(50, 300)
        address = str(randint(0, 1000)) + " " + str(randint(0, 100)) + " Street"
        roomType = ""
        if(randint(0,1) > 0):
            roomType = "Private"
        else:
            roomType = "Shared"
        tags = []
        a = randint(0, len(tagNames) - 1)
        b = randint(0, len(tagNames) - 1)
        if(a != b):
            tags.append(tagNames[a])
            tags.append(tagNames[b])
        else:
            tags.append(tagNames[a])
        #print(tags)
        #print(tags)

        params = urllib.urlencode({'city': choice(cityNames),
                                'address': address,
                                'hostName': assignedHostName,
                                'hostID': assignedHostID,
                                'bio': bio,
                                'description': description,
                                'price': price,
                                'roomType': roomType,
                                'tags': tags
                                })

        # POST the listing
        conn.request("POST", "/api/listings", params, headers)
        response = conn.getresponse()
        data = response.read()
        print(data)
        d = simplejson.loads(data)

        listingID = str(d['data']['_id'])
        # Make sure the listing is added to the pending list of the user

            # GET the correct user
#            conn.request("GET","""/api/users?where={"_id":\""""+assignedUserID+"""\"}""")
        conn.request("GET", """/api/users?where={"_id":\""""+assignedHostID+"\"}")
        response = conn.getresponse()
        data = response.read()
        d = simplejson.loads(data)

        # Store all the user properties
        assignedUserName = str(d['data'][0]['name'])
        assignedHostEmail = str(d['data'][0]['local']['email'])
        assignedHostPassword = str(d['data'][0]['local']['password'])
        assignedHostBio = str(d['data'][0]['bio'])
        assignedHostAge = str(d['data'][0]['age'])

#        assignedUserDate = str(d['data'][0]['dateCreated'])

        assignedHostListing = d['data'][0]['postedHostAds']
        # Append the new listingID to pending listings
#            assignedUserTasks = d['data'][0]['pendingTasks']
        assignedHostListing = [str(x).replace('[','').replace(']','').replace("'",'').replace('"','') for x in assignedHostListing]
        assignedHostListing.append(listingID)


        # PUT in the user
        params = urllib.urlencode({'_id': assignedHostID,
                                'name': assignedHostName,
                                'local':{
                                    'email': assignedHostEmail,
                                    'password': assignedHostPassword
                                },
                                'age': assignedHostAge,
                                'bio': assignedHostBio,
                                'postedHostAds': assignedHostListing}, True)
        conn.request("PUT", "/api/users/"+assignedHostID, params, headers)
        response = conn.getresponse()
        data = response.read()
#        print(data)
        d = simplejson.loads(data)

    # Exit gracefully
    conn.close()
    print str(userCount)+" users and "+str(listingCount)+" listings added at "+baseurl+":"+str(port)


if __name__ == "__main__":
     main(sys.argv[1:])
