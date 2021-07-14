#!/bin/sh
cd "$HOME"/sendMail || exit
npm run start

# update logs.csv changes to github
if [ "$(git status --porcelain | grep -c logs.csv)" -eq "1" ]; then
  echo "✅ logs found"
  # start logs.csv git staging
  git add logs.csv
  # Commit Changes to Git with Custom Message
  CURRENTDATE=$(date +"%Y-%m-%d")
  commit_msg="🚀 update logs.csv 📅$CURRENTDATE"
  git commit -m "$commit_msg"
  # push changes to remote 
  git push origin master
  echo "🚀 logs updated successfully"
else 
  echo "🔴 No logs found"
fi

echo "Sleeping with 3 seconds time out ..." && sleep 3
