cd /Users/shashwat/Desktop/LEarning/Learning\ NOde/server\ first
echo "Enter Commit Message"
read Message
# if [Message -eq ""]
# then 
Message="Auto Commit"
# fi
git add -A
git commit -m "$Message"
git push
