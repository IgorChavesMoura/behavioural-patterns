export default class Marketing {

    update({ id, userName }) {

        // important to remember that [update] is responsable to manage it's own errors/exceptions
        // it shoudn't have await on notify because it's feature is just to emit events
        console.log(`[${id}]: [marketing] will send a welcome email to ${userName}`);

    }

}