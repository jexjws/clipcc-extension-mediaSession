const { Extension, type, api } = require('clipcc-extension');

class MyExtension extends Extension {
    onInit() {
        //用于处理用户输入的图片 URL，涉及平台安全，得999检查
        let fuckURL = () => 0;
        //分类 "设定媒体元数据" ：
        api.addCategory({
            categoryId: 'jexjws.mediasession.category.media_metadata',
            messageId: 'jexjws.mediasession.category.media_metadata',
            color: '#66CCFF'
        });
        //积木 "设定媒体元数据中的 [key] 为 [value] " ：
        api.addBlock({
            opcode: 'jexjws.mediasession.v1.set_media_metadata',
            type: type.BlockType.REPORTER,
            messageId: 'jexjws.mediasession.block.set_media_metadata',
            categoryId: 'jexjws.mediasession.category.media_metadata',
            param: {
                key: {
                    type: type.ParameterType.STRING,
                    menu: [{
                        messageId: 'jexjws.mediasession.block.set_media_metadata.menu.title',
                        value: 'title'
                    }, {
                        messageId: 'jexjws.mediasession.block.set_media_metadata.menu.artist',
                        value: 'artist'
                    }, {
                        messageId: 'jexjws.mediasession.block.set_media_metadata.menu.album',
                        value: 'album'
                    }],
                    default: 'title'
                },
                value: {
                    type: type.ParameterType.STRING,
                    default: '  '
                }
            },
            function: (args) => 'Hello, ClipCC!' + String(args)
        });
    }
    onUninit() {
        api.removeCategory('jexjws.mediasession.category.MediaMetadata');
    }
}

module.exports = MyExtension;
