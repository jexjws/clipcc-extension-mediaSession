const { Extension, type, api } = require('clipcc-extension');

class MyExtension extends Extension {
    onInit() {
        api.addCategory({
            categoryId: 'jexjws.mediasession.category',
            messageId: 'jexjws.mediasession.category',
            color: '#66CCFF'
        });
        api.addBlock({
            opcode: 'jexjws.mediasession.hello',
            type: type.BlockType.REPORTER,
            messageId: 'jexjws.mediasession.hello',
            categoryId: 'jexjws.mediasession.category',
            function: () => 'Hello, ClipCC!'
        });
    }
}

module.exports = MyExtension;
