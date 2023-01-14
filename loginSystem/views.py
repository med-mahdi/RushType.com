# Import The Fill That Contain All The Packages
from .packages import *
from .functionality import *
from .models import *
from .models import viewsTraffic
      

    

#> This View Render The Hero Page
def heroPage(request):
    pageName = "hero Page"
    traffic = viewsTraffic.objects.create(pageName=pageName)
    traffic.save()

    print("taffic saved")
    return render(request,'home.html')



#> This View Render The Hero Page
def aboutPage(request):
    pageName = "About Page"
    traffic = viewsTraffic.objects.create(pageName=pageName)
    traffic.save()

    if request.method == "POST":
        emailData = request.POST["email"]
        messageData = request.POST["message"]
        msg = Messages.objects.create(email=emailData,message=messageData)
        msg.save()

    return render(request,'about.html')




#> This View Handle User Registration Process
@alreadyLoggedIn
def registerPage(request):
    pageName = "register Page"
    traffic = viewsTraffic.objects.create(pageName=pageName)
    traffic.save()


    form = UserCreationForm()
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        name = request.POST["username"]
        latitude = request.POST["latitude"]
        longitude = request.POST["longitude"]

        if form.is_valid():
            user = form.save()
            name = user.username
            userLocationInfo(name,latitude,longitude)
            messages.success(request,"User Created Successfuly :)")
            return redirect("loginPage")

        else:
            userExists = allUsersApi(name)
            if userExists:messages.error(request,"Error: User Already Exists, Please Try Again!")
            else:messages.error(request,"Error: Please Enter a Valid Data!")
            return redirect("registerPage")

    context = {'form':form}
    return render(request,"register.html",context)
  




#> This View Handle User Authentication
@alreadyLoggedIn
def loginPage(request):
    pageName = "login Page"
    traffic = viewsTraffic.objects.create(pageName=pageName)
    traffic.save()


    if request.method == "POST":
        name = request.POST["username"]
        password = request.POST["password"]
        
        user = authenticate(request, username=name , password = password)
        if user is not None:
            login(request,user)
            return redirect("testPage")

        else:
            userExists = allUsersApi(name)
            if userExists:
                messages.error(request,"Error: username or password must be incorrect")
            else:
                messages.error(request,"Error: User Doesn't Exist, Try Again")
            return redirect("loginPage")

    return render(request,"login.html")





#> This View Responsable for the logout Functionality
@login_required(login_url="loginPage")
def logoutPage(request):
    pageName = "logout Page"
    traffic = viewsTraffic.objects.create(pageName=pageName)
    traffic.save()

    logout(request)
    return redirect("loginPage")






