"use strict";

const Packet = require("./Packet");

class TextCommandPacket extends Packet {
    constructor(msg) {
        super();

        this.type = "text.command";

        let params = msg.cleanContent.split(/\s+/);
        let command = (params.splice(0, 1))[0].substr(1);

        this.payload = {
            author: {
                id: msg.author.id,
                name: msg.server.detailsOf(msg.author).nick || msg.author.name,
                roles: msg.server.rolesOf(msg.author).map(r => r.name),
            },
            message: {
                command,
                params,
                id: msg.id,
                text: msg.cleanContent,
            }
        };
    }
}

module.exports = TextCommandPacket;
