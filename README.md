<p>This app is built using CRA. To replicate, do the following:</p>
<ul>
  <li>1. In terminal, create new project: "npx create-react-app meet --template cra-template-pwa --use-npm"</li>
  <li>2. "cd meet" "npm run start"</li>
  <li>3. Via terminal, deploy to GH: "npm install --save-dev gh-pages"</li>
  <li>4. In GH, create new repository, then follow prompts to add existing repo via terminal.</li>
  <li>5. Add your homepage URL to package.json file (between "private" and "dependencies").</li>
  <li>6. In package.json, add to "scripts" section: "predeploy": "npm run build",
"deploy": "gh-pages -d build"</li>
  <li>7. Add remote URL, via terminal: "git init" , "git remote add origin https://github.com/leanneduyck/Meet.git"</li>
  <li>8. Commit and push changes, via terminal: "git add ." , "git commit -m "First commit" , "git branch -M main" , "git push -u origin main"</li>
  <li>9. Deploy, via terminal: "npm run deploy"</li>
</ul>
