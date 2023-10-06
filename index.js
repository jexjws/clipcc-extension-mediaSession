const { Extension, type, api } = require('clipcc-extension');

class MyExtension extends Extension {
    onInit() {
        //用于处理用户输入的图片 URL，涉及平台安全。
        let fuckURL = () => 0;

        //分类 "浏览器兼容性检查 - mediaSession" ：
        api.addCategory({
            categoryId: 'jexjws.mediasession.category.compatibility_test',
            messageId: 'jexjws.mediasession.category.compatibility_test',
            color: '#582396'
        });
        api.addBlock({
            opcode: 'jexjws.mediasession.v1.can_use_mediaSession',
            messageId: 'jexjws.mediasession.block.can_use_mediaSession',
            categoryId: 'jexjws.mediasession.category.compatibility_test',
            type: type.BlockType.BOOLEAN,
            function: () => ("mediaSession" in navigator)
        })

        //分类 "媒体元数据" ：
        api.addCategory({
            categoryId: 'jexjws.mediasession.category.media_metadata',
            messageId: 'jexjws.mediasession.category.media_metadata',
            color: '#582396'
        });
        //积木 "设定媒体元数据中的 [key] 为 [value] " ：
        api.addBlock({
            opcode: 'jexjws.mediasession.v1.set_media_metadata',
            type: type.BlockType.COMMAND,
            messageId: 'jexjws.mediasession.block.set_media_metadata',
            categoryId: 'jexjws.mediasession.category.media_metadata',
            param: {
                key: {
                    type: type.ParameterType.STRING,
                    menu: [{
                        messageId: 'jexjws.mediasession.menu.title',
                        value: 'title'
                    }, {
                        messageId: 'jexjws.mediasession.menu.artist',
                        value: 'artist'
                    }, {
                        messageId: 'jexjws.mediasession.menu.album',
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
        api.removeCategory('jexjws.mediasession.category.media_metadata');
        api.removeCategory('jexjws.mediasession.category.compatibility_test');
    }
}

module.exports = MyExtension;
