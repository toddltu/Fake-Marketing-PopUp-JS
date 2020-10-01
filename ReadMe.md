# Simple Left Bottom Corner Fake PopUp

Script reqires **JQuery** framework

__example:__

```js
    const options = {
        random: true, // optional - boolen - by default is true. Picks item from list in random order
        loop: true, // optional - boolean - by default is true. When all the list is show, can it reapet
        once: false, // optional - boolean - by default is false. In loop item is allowed to be shown once
        popAfter: 3, // optional - integer - by default 3. Time in seconds, when next popup will be fired when presented popup ends his appearances
        popShow: 4 // optional - integer - by default is 4. Time in seconds, how long presented popup will be performing
    };
    const list = [
        {
            image: 'link_to_img', // optional
            content: 'your whanted text you can use html tags', // required
            popAfter: 5, // optional, if not using, the input will be taken from global ('options') popAfter value
            popShow: 10, // optional, if not using, the input will be taken from global ('options') popShow value
        },
        {
            content: '<i>Your</i> next <b>whanted</b> <snall>text</small>'
        }
        ...
    ];

    // assigning all options and items
    const popup = new FMarketPopUp(options, list);
    // fires script to do his work
    popup.start();
```