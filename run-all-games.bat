call npm run test:LivePage -- -- --env=PRO_SG --gameid=2 > Report-livepage\report_gameSeDie.log 2>&1
curl -F "chat_id=979905494" -F document=@Report-livepage\report_gameSeDie.log https://api.telegram.org/bot7878869530:AAFcWFFLMtC8DQl7LbR2yjnm1r9UHLykEUo/sendDocument

call npm run test:LivePage -- -- --env=PRO_SG --gameid=3 > Report-livepage\report_gameFishPrawnCrab.log 2>&1
curl -F "chat_id=979905494" -F document=@Report-livepage\report_gameFishPrawnCrab.log https://api.telegram.org/bot7878869530:AAFcWFFLMtC8DQl7LbR2yjnm1r9UHLykEUo/sendDocument

call npm run test:LivePage -- -- --env=PRO_SG --gameid=10 > Report-livepage\report_gameBaccarat.log 2>&1
curl -F "chat_id=979905494" -F document=@Report-livepage\report_gameBaccarat.log https://api.telegram.org/bot7878869530:AAFcWFFLMtC8DQl7LbR2yjnm1r9UHLykEUo/sendDocument

call npm run test:LivePage -- -- --env=PRO_SG --gameid=22 > Report-livepage\report_gameVipSeDie.log 2>&1
curl -F "chat_id=979905494" -F document=@Report-livepage\report_gameVipSeDie.log https://api.telegram.org/bot7878869530:AAFcWFFLMtC8DQl7LbR2yjnm1r9UHLykEUo/sendDocument

call npm run test:LivePage -- -- --env=PRO_SG --gameid=55 > Report-livepage\report_gameMonteBigSmall.log 2>&1
curl -F "chat_id=979905494" -F document=@Report-livepage\report_gameMonteBigSmall.log https://api.telegram.org/bot7878869530:AAFcWFFLMtC8DQl7LbR2yjnm1r9UHLykEUo/sendDocument

call npm run test:LivePage -- -- --env=PRO_SG --gameid=71 > Report-livepage\report_gameClorGame.log 2>&1
curl -F "chat_id=979905494" -F document=@Report-livepage\report_gameClorGame.log https://api.telegram.org/bot7878869530:AAFcWFFLMtC8DQl7LbR2yjnm1r9UHLykEUo/sendDocument

call npm run test:LivePage -- -- --env=PRO_SG --gameid=80 > Report-livepage\report_gameCoinToss.log 2>&1
curl -F "chat_id=979905494" -F document=@Report-livepage\report_gameCoinToss.log https://api.telegram.org/bot7878869530:AAFcWFFLMtC8DQl7LbR2yjnm1r9UHLykEUo/sendDocument