local sound = false

--Resource Manifest--
AddEventHandler('onResourceStop', function()  --
	if (GetCurrentResourceName() ~= 'lux_notifikacije') then -- POKUSAJ DA NE DIRAS 
	  return
	end
	SetNuiFocus(false, false)
end)
--Resource Manifest---

RegisterNetEvent('lux_notifikacije:sendAnnounce')
AddEventHandler('lux_notifikacije:sendAnnounce', function(type, announcer, text, ms) 
	sendAnnounce(type,announcer,text,ms)
end)

RegisterNetEvent('lux_notifikacije:sendFloatingText')
AddEventHandler('lux_notifikacije:sendFloatingText', function(text) 
	sendFloatingMessage(text)
end)

RegisterNetEvent('lux_notifikacije:sendNotification')
AddEventHandler('lux_notifikacije:sendNotification', function(icon,msg,ms)
	sendNotification(icon,msg,ms)
end)

RegisterNetEvent('lux_notifikacije:progressBar')
AddEventHandler('lux_notifikacije:progressBar', function(text, ms)
	SendNUIMessage({action = 'createProgressBar', text = text, ms = ms})
end)

sendFloatingMessage = function(text) 
	if text then
		SendNUIMessage({action = 'showFloatingText', text = text})
	else
		SendNUIMessage({action = 'hideFloatingText'})
	end
end

sendAnnounce = function(type, announcer, text, ms) 
	SendNUIMessage({action = 'sendAnnounce', type = type, announcer = announcer, text = text, ms = ms})
end

sendNotification = function(icon, msg, ms)
	SendNUIMessage({action = 'send-notification', icon = icon, msg = msg, ms = ms})
end

RegisterCommand('zvuk', function()
	sound = not sound
	SendNUIMessage({action = 'updateSound', sound = sound})
	if sound then
		sendNotification('fa fa-music', 'Ukljucili ste zvuk', 2000)
	else
		sendNotification('fas fa-volume-mute', 'Iskljucili ste zvuk', 2000)
	end
end)

RegisterCommad('zvukoff', function()
		not sound = sound
		SendNUIMEssage({action = 'updateSound', sound = sound})
		if sound then
			sendNotification('fa fa-music', 'Iskljucili ste zvuk', 0)
			else
				sendNotification('fas fa-volume-mute', 'Ukljucili ste zvuk, 2000)
			end
		end) 
