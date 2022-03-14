// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { CardFactory, MessageFactory } = require("botbuilder");
const {
    OAuthPrompt,
    Dialog,
    getUserToken,
    getSignInResource,
    exchangeToken,
    signOutUser,
} = require("botbuilder-dialogs");
const { DialogBot } = require("./dialogBot");
const {
    oauthCard,
    ssoCard,
    oauthLoginCard,
    ssoLoginCard,
} = require("../helpers/cards");

class TeamsBot extends DialogBot {
    /**
     *
     * @param {ConversationState} conversationState
     * @param {UserState} userState
     * @param {Dialog} dialog
     */
    constructor(conversationState, userState, dialog) {
        super(conversationState, userState, dialog);

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(
                        "Welcome to TeamsBot. Type anything to get logged in. Type 'logout' to sign-out."
                    );
                }
            }

            await next();
        });

        this.executeInvokeCount = 0;
    }

    async handleTeamsSigninVerifyState(context, state) {
        const settings = {
            connectionName: process.env.connectionName,
            text: "Please Sign In",
            title: "Sign In",
            timeout: 300000,
        };
        const token = await getUserToken(context, settings, state.state);
        if (token) {
            const msg = MessageFactory.attachment(
                CardFactory.adaptiveCard(oauthLoginCard)
            );
            msg.id = context.activity.replyToId;
            await context.updateActivity(msg);
        }
    }

    async handleTeamsSigninTokenExchange(context, state) {
        const settings = {
            connectionName: process.env.connectionName,
            text: "Please Sign In",
            title: "Sign In",
            timeout: 300000,
        };
        const token = await exchangeToken(context, settings, {
            token: state.token,
        });
        if (token && token.token) {
            const msg = MessageFactory.attachment(
                CardFactory.adaptiveCard(ssoLoginCard)
            );
            msg.id = context.activity.replyToId;
            await context.updateActivity(msg);
        }
    }

    async handleAdaptiveCardAction(context) {
        this.executeInvokeCount++;
        console.log(this.executeInvokeCount);
        const verb = context.activity.value.action.verb;
        const authentication = context.activity.value.authentication;
        const state = context.activity.value.state;
        const contentType = "application/vnd.microsoft.activity.message";
        let content = "Testing ACv2 sign-in flow";
        const settings = {
            connectionName: process.env.connectionName,
            text: "Please Sign In",
            title: "Sign in",
            timeout: 300000,
        };

        /**
         * LOGOUT FLOW
         */
        if (verb === "oauth-logout") {
            await signOutUser(context, settings);
            const msg = MessageFactory.attachment(
                CardFactory.adaptiveCard(oauthCard)
            );
            msg.id = context.activity.replyToId;
            await context.updateActivity(msg);
            return {
                statusCode: 200,
                type: contentType,
                value: "You have been logged out!",
            };
        } else if (verb === "sso-logout") {
            await signOutUser(context, settings);
            const msg = MessageFactory.attachment(
                CardFactory.adaptiveCard(ssoCard)
            );
            msg.id = context.activity.replyToId;
            await context.updateActivity(msg);
            return {
                statusCode: 200,
                type: contentType,
                value: "You have been logged out!",
            };
        }

        /**
         *  OAUTH FLOW
         *  1. Verify login state
         *  2. If logged in show a success message response
         *  3. Else send a sign-in card as an embedded message response
         */
        if (verb === "oauth-signin") {
            const output = await getUserToken(context, settings, state);
            if (output) {
                const card = CardFactory.adaptiveCard(oauthLoginCard);
                return {
                    statusCode: 200,
                    type: "application/vnd.microsoft.card.adaptive",
                    value: card.content,
                };
            } else {
                const signInResource = await getSignInResource(
                    context,
                    settings
                );
                const card = CardFactory.oauthCard(
                    settings.connectionName,
                    settings.title,
                    settings.text,
                    signInResource.signInLink
                );
                content = JSON.stringify(card);
                return {
                    statusCode: 200,
                    type: contentType,
                    value: content,
                };
            }
        }

        /**
         * SSO FLOW without auth block
         * 1. Send OAuth card with resourceURL to trigger SSO on client
         * 2. signin/tokenExchange invoke handler to operate the rest
         */
        if (verb === "sso-signin") {
            if (authentication) {
                const output = await exchangeToken(context, settings, {
                    token: authentication.token,
                });
                if (output && output.token) {
                    const card = CardFactory.adaptiveCard(ssoLoginCard);
                    return {
                        statusCode: 200,
                        type: "application/vnd.microsoft.card.adaptive",
                        value: card.content,
                    };
                }
            } else {
                const signInResource = await getSignInResource(
                    context,
                    settings
                );
                const card = CardFactory.oauthCard(
                    settings.connectionName,
                    settings.title,
                    settings.text,
                    signInResource.signInLink,
                    signInResource.tokenExchangeResource
                );
                content = JSON.stringify(card);
                return {
                    statusCode: 200,
                    type: contentType,
                    value: content,
                };
            }
        }
    }
}

module.exports.TeamsBot = TeamsBot;
