ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

RegisterCommand('obavesti', function(source, args, rawCommand)
    local _source = source
    local admin = ESX.GetPlayerFromId(_source)
   -- print(admin.getGroup())
   -- admin.setAduty(true)
    if admin.getGroup() == 'owner' or 'superadmin' and (args[1] == "1" or args[1] == "2" or args[1] == "3") then
        sendAnnounce(args[1], GetPlayerName(_source), table.concat(args, ' ', 2))
    elseif admin.getGroup() == 'mod' and (args[1] == 1) then
      --  print('mod')
    else 
        print('Nemate permisiju za tu komandu!')
    end
end)



function sendAnnounce(type, announcer, text) 
    local xPlayers = ESX.GetPlayers()
    if type and announcer and text then
        if type == "3" then
            type = 'center'
        elseif type == "2" then
            type = 'side'
        else 
            type = 'top'
        end
        for i=1, #xPlayers, 1 do
            local xPlayer = ESX.GetPlayerFromId(xPlayers[i]) 
            TriggerClientEvent('lux_notifikacije:sendAnnounce', xPlayer.source, type, announcer, text, 7000)
        end
    else
        print('niste lepo ispisali')
    end
end