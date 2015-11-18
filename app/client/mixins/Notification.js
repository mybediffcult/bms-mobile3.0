export default class Notification {
    constructor(config){
        if(!config)
            config = {
                transitionDuration: 700,
                autoHideDuration: 1500
            };

        this.transitionDuration = config.transitionDuration ? config.transitionDuration : 700;
        this.autoHideDuration = config.autoHideDuration ? config.autoHideDuration : 1500;
    }

    show(message, onDismiss) {

        var transition = '-moz-transition: all ' + this.transitionDuration / 1000 + 's ease;' +
            '-webkit-transition: all ' + this.transitionDuration / 1000 + 's ease;' +
            '-o-transition: all ' + this.transitionDuration / 1000 + 's ease;' +
            'transition: all ' + this.transitionDuration / 1000 + 's ease;';

        if(Notification.transitionOutTimeout)
            clearTimeout(Notification.transitionOutTimeout);

        if(Notification.dismissTimeout)
            clearTimeout(Notification.dismissTimeout);

        var notification = document.getElementById('notification');
        if(!notification) {
            notification = document.createElement('div');
            notification.setAttribute('id', 'notification');
        }
        notification.setAttribute('class', 'notification');
        notification.innerHTML = message;
        document.body.appendChild(notification);

        setTimeout(function() {
            notification.setAttribute('style', 'height: 40px;' + transition);
        }, 10);


        Notification.transitionOutTimeout = setTimeout(function() {
            notification.setAttribute('style', 'height: 0px;' + transition);
            clearTimeout(Notification.transitionOutTimeout);
        }, this.autoHideDuration);

        if(onDismiss)
            Notification.dismissTimeout = setTimeout(function() {
                onDismiss();
                clearTimeout(Notification.dismissTimeout);
            }, this.transitionDuration + this.autoHideDuration);

    }
}
