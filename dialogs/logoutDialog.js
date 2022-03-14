// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { CardFactory, MessageFactory } = require("botbuilder");
const { ActivityTypes } = require("botbuilder");
const { ComponentDialog, getUserToken } = require("botbuilder-dialogs");
const { oauthCard, ssoCard } = require("../helpers/cards");

class LogoutDialog extends ComponentDialog {
    constructor(id, connectionName) {
        super(id);
        this.connectionName = connectionName;
    }

    async onBeginDialog(innerDc, options) {
        const result = await this.interrupt(innerDc);
        if (result) {
            return result;
        }

        return await super.onBeginDialog(innerDc, options);
    }

    async onContinueDialog(innerDc) {
        const result = await this.interrupt(innerDc);
        if (result) {
            return result;
        }

        return await super.onContinueDialog(innerDc);
    }

    async interrupt(innerDc) {
        if (innerDc.context.activity.type === ActivityTypes.Message) {
            const text = innerDc.context.activity.text.toLowerCase();
            if (text === "logout") {
                const userTokenClient = innerDc.context.turnState.get(
                    innerDc.context.adapter.UserTokenClientKey
                );

                const { activity } = innerDc.context;
                await userTokenClient.signOutUser(
                    activity.from.id,
                    this.connectionName,
                    activity.channelId
                );

                await innerDc.context.sendActivity("You have been signed out.");
                return await innerDc.cancelAllDialogs();
            } else if (text === "acv2") {
                await innerDc.context.sendActivity(
                    MessageFactory.attachment(
                        CardFactory.adaptiveCard(oauthCard)
                    )
                );
                return await innerDc.cancelAllDialogs();
            } else if (text === "acv2 sso") {
                await innerDc.context.sendActivity(
                    MessageFactory.attachment(CardFactory.adaptiveCard(ssoCard))
                );
                return await innerDc.cancelAllDialogs();
            }
        }
    }
}

module.exports.LogoutDialog = LogoutDialog;
