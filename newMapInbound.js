function mapToDittoProtocolMsg(headers, textPayload, bytePayload, contentType) {
    const jsonString = String.fromCharCode.apply(null, new Uint8Array(bytePayload));
    const jsonData = JSON.parse(jsonString);
    const thingId = jsonData.thingId.split(':');
    const type = jsonData.type;
    if(type == 'update'){
        const pathTemperature = '/features/temperature/properties/';
        const pathHumidity = '/features/humidity/properties/';
        const pathBrightness = '/features/brightness/properties/';
        const pathLight = '/features/light/properties/';
        const valueTemperature = { value: jsonData.temperature };
        const valueHumidity = { value: jsonData.humidity };
        const valueBrightness = { value: jsonData.brightness };
        const valueLight = { value: jsonData.light };
        const dittoProtocolMsgTemperature = Ditto.buildDittoProtocolMsg(thingId[0], thingId[1], 'things', 'twin', 'commands', 'modify', pathTemperature, headers, valueTemperature);
        const dittoProtocolMsgHumidity = Ditto.buildDittoProtocolMsg(thingId[0], thingId[1], 'things', 'twin', 'commands', 'modify', pathHumidity, headers, valueHumidity);
        const dittoProtocolMsgBrightness = Ditto.buildDittoProtocolMsg(thingId[0], thingId[1], 'things', 'twin', 'commands', 'modify', pathBrightness, headers, valueBrightness);
        const dittoProtocolMsgLight = Ditto.buildDittoProtocolMsg(thingId[0], thingId[1], 'things', 'twin', 'commands', 'modify', pathLight, headers, valueLight);
        const array = [dittoProtocolMsgTemperature, dittoProtocolMsgHumidity, dittoProtocolMsgBrightness, dittoProtocolMsgLight];
        return array;
    }
    else{
        const valueMsg = { value: jsonData.temperature };
        const headersMsg = {'content-type': 'application/json'};
        const dittoProtocolEvent = Ditto.buildDittoProtocolMsg(thingId[0], thingId[1], 'things', 'live', 'messages', 'high_temperature', 'outbox/messages/high_temperature', headersMsg, valueMsg);
        return dittoProtocolEvent;
    }
}
