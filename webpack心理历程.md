梳理一下webpack配置vue的单页文件应用的过程。<br/>
##webpack自身的核心概念##
根据官网的解释，webpack的核心概念就是通过一个入口文件或者多个，内部去建立一个依赖图表，例如require了什么,例如import了什么,这些都作为依赖去处理，处理的过程是通过loader+plugin，最终组成一个js应用。
## webpack的周边一些概念 ##
首先要明确webpack和webpack-dev-server是2个东西，webpack的功能还是跟官方图片一样就是把各种静态文件处理成js文件，这个功能就是loader给的，为什么要打包呢，这是个好问题，首先js文件按理说，只需要一个就行了，但是呢大型项目如果前端的交互逻辑很多，后端只是简单的restful做一个前后分离的系统，显然前端开发的人，那就会每天只对着一个文件改来该去，名字还不能重复，一个很有影响的人说过，计算机科学里面最难处理的2个问题，一个是缓存一个是命名，那么前端必然需要协作开发，那现在协作开发怎么办呢？前端又不能io，单纯的分文件的话，还是共享一个上下文，好，现在在每个文件里面都设置一个命名空间，现在每个人的共享一个命名空间，这样又有个问题，调用别人的命名空间的时候，需要知道别人的命名空间是什么，如果别人一旦修改这边就崩了，同时共享的工具类，还是存在这个问题，所以webpack是基于node来做构建，node属于后端的东西，它能io，同时es也出了modules标准（没有这个标准可以用commonJS标准或者amd标准），正是这个契机，前端人员开发，可以真正的模块化开发了，最终通过webpack一起打包成js文件，这里在说下，是否全部打包成一个js文件最好呢？答案也不是，浏览器同时应该能给4个并发的http的请求，当一个文件足够小的时候，压缩成一个可以，当非常非常大的时候，这时候不一定一个文件是最好的，因为js是阻塞的，具体看zakas大神写那本高性能js，再回到打包模块，现在的问题是，我的文件不全都是js啊，我写前端还有html啊，还有css啊还有图片啊，这时候webpack loader可以解决这个问题，通过loader将这些文件转化成js，现在问题是如果都是js该多好啊，ok！答应你，vue和react就是做这个事情的，如果一个项目文件里面有太多的.html文件，css文件还有js文件，本身我一个只是打包js为初衷的工具，现在还要肩负着打包html，处理css，首先呢js的dom操作告诉了我们，js是可以dom操作进行html的实时渲染的，再加上dom操作的性能消耗很可观，可以来优化这个机制，于是vue和react，angular3架马车出来，单页应用也应运而生，首先这3个框架，基本上解决了不需要html文件的痛点，因为我webpack打包了html怎么去渲染呢？vue做了事情，就是component的概念（并不一定是vue提出），component解决了什么痛点呢，我只需要一个入口的index.html文件就行了，其余的所有页面的东西，都是在由component来组成，component由3个部分组成，这3个部分分别是组件对应的js，css和html有点像是mvc的感觉了，实际上把这个叫mvvm了，数据在js里面，样式是html+css属于view层，现在的问题是，vue里面通过一个virtual dom的东西通过diff算法，来进行对比，这样的话，我的html就不用打包了，因为html通过vue里面的逻辑来进行动态的dom插入和移除，这个性能是好于原生的dom操作的，那么点在解决的html和js的问题了，css的问题怎么办了，没法解析啊，css如果也考js去动态写入的话，这样会很难维护，于是呢，还是老实的用css-loader吧，但是呢，loader能够解析，但是不能用啊，因为loader只是把css放进了js，相当于换了一种形式，而浏览器解析js的引擎和解析css的引擎是不一样的，例如chrome的是webkit去解析表现层，v8才是js引擎，现在css在js文件里头，怎么解析嘛！于是插件应运而生，插件怎么理解？插件按照维基百科的说法就是，为一个计算机软件增加一个特定的功能的，换句话说，就是扩展功能。好，现在通过loader把js，html,css全部放进了js中，由于vue框架的功能，可以让html和js都通过js来处理，html通过render函数渲染，render本身就在js文件中运行，css需要另开一个文件，告诉浏览器这个不是js而是css，loader都是打包成js的，现在我们需要从打包后的js中，提取出js文件，那么插件应运而生，针对webpacjk4.0+，使用MiniCssExtractPlugin，可以将打包后的文件中抽取出css，好，现在css也被抽取出来，js和html统一由vue框架通过js来管理，现在是我怎么去引用呢，好，再来个插件，htmlWepackPlugin出来了，js再怎么牛逼，也要找地方去插入吧，也就是说至少有个初始的html文件给我去操作吧，去引入vue吧，好，现在通过这个插件，生成一个模板，比如你vue要new Vue().$mount("#app")的时候，可以我就通过这个插件去给你创造一个这样的模板，然后放在打包后的文件中，同时这个模板可以自动帮我引入了css和js，理论上一个vue的单文件转化的过程就这完成了，但是下面要开发啊？我不可能每次写完，再去打包，打包完了再去点开文件开吧，我需要有个服务器，给我做请求用啊，那么webpack-dev-server应运而生，这个就是用来做服务器用的，现在就是基于node来搭建了一个服务器，这个配置现在先不写，后面有东西了再写;
## webpack的一些细节 ##
首先vue-loader做了什么事情，首先呢，根据官方文档的说明，它是允许单文件组件的每个部分使用其他的webpack loader来处理的。比如<style></style>这个东西，vue-loader会把他们处理成依赖关系，比如require("a.css");那么webpack就可以通过css-loader去解析它，因为本省require在node里面只能require，js，json这种，处理完了之后，还没完，还需要嵌入到页面中去吧，如果要嵌入到页面总去，就用style-loader，它相当于是把解析后的css，通过dom嵌入到html页面中，但是问题是，这不是推荐写html页面css的方式啊，应该要用<link>来做一个连接，那么ok，然后css-loader解析后，再把它给提取出来，这样就能在htmlwebpack里面形成一个外部文件css的引用，这样符合，分离的规则。使用vue-loader的时候vue会把<style></style>中的作为依赖抛给webpack的css-loader去解析，解析是为了以能够识别的形式放入最终的js文件中，但最终的运行肯定是不能够运行的，css显然无法放在js中运行。<br/>
还有就是插件也好，loader也好，最好是按照官方的教程来进行配置，有的地方既需要loader也需要plugin，比如VueLoader和VueLoaderPlguin，需要同时配置，正向去配置，防止反向去反推，这样的话，很难找到错误，可能就需要看webpack的控制台了。
打包进入js文件中的css，会按照一定形式的解析去标注，包括sourceUrl的指向，属于哪个组件等一些信息。<br/>
经过尝试，发现不同的loader之间，是不需要有顺序的，但是一个大loader里面的有多个loader的话，会从后往前进行一层一层的链式调用。<br/>
注意resolve中的alias只用于import和require，和<img src="xxx" />没有关系，这里只能说vue团队并没有把这个img src的属性进行转化为模块方式的引用。所以在写vue的时候,这个src要写真实路径。<br/>
用webpack打包，一般文件名不是hardcode的，而是使用[name],注意当entry只是单纯的字符串和字符串数组，这个name值就是'main'，这种情况下是多个文件打包到一个文件中去，如果设置成key-value的对象，那么输出的[name]就是key，注意使用[name]要看输入文件是怎么样的，如果输入文件有多个，那么输出文件也有多个，如果hardcode一个输出文件，那么相当于多个文件打包成一个。每个文件的打包基本上也用到了hash来保留以前的版本，我觉得这里必不必要要看情况而定。<br/>
装了webpack之后，在命令行中找不到webpack的指令，是因为没有安装webpack-cli，需要继续安装这个才可以在控制台运行这个。
## 配置webpack过程 ##
(1)首先能够通过webpack能够通过vue-loader把.vue打包成js文件，同时将css分离出来，并且能够挂载到首页，形成单页应用的首页入口。以上是webpack的范畴，下面简述一下步骤，不涉及细节分析，主要侧重应用。<br/>
*vue:使用vue没有这个,后面还谈什么<br/>
*vue-loader,解析vue的单页应用的loader<br/>
*vue-loader-plugin,解析vue单页的plugin<br/>
*html-webpack-Plugin,生成初始html页面的plugin<br/>
*css-lader,解析vue-loader-plugin处理后的css依赖<br/>
*miniCssExtractiPlugin.loader,把css依赖解析后，交给这个laoader<br/>
*miniCssExtractiPlugin,提取之后生成一个新的css文件<br/>
*url-laoder,静态文件,注意这里设置最好有个上限,当图片过于大的时候，不转化成dataurl，这里需要分析的图片文件大小多少合适，base64的编码绝对是大于源文件的因为它是将2进制文件中的每6位二进制数转化为一个8位二进制数，并且对应一个asc字符,大小多了百分之33，但是呢，多个src发送请求的开销也许比一个很小图片的开销要小，因此这里需要折中一下。具体情况具体分析<br/>
图片设置限制大小后，webpack会默认以file-loader去解析这个大图片，最后生成一个hash码命名的文件，放在输出文件目录中，同时引用的路径改为相对路径，详细见图<br/>
以上是配置一个单页应用程序的最小的解析范围，它不涉及到less，scss的处理，不涉及到本地开发，仅仅就是解析通过vue写的程序。
(2)webpack-dev-server的配置，没有这个东西，怎么玩开发呢<br/>
*webpack-dev-server的安装，注意webpack本身的配置文件是node环境去跑,实际上是express，加了一个中间件，根据实践发现，实际上不支持import，也就是说解析该配置文件自身的时候还是纯粹node环境，commonjs规范，配置文件里面制定的babel-loader是针对入口文件的依赖进行的，因此配置文件最好还是用require(xxx)，导出也不要用export，选用module.exprots<br/>
*dev-server只是纯粹用来开发的<br/>
*dev-server实际上底层需要用到webpack打包的配置，利用这个配置在内存里面存放打包后的文件作为服务<br/>
*可以配置端口,配置hot加载，个人认为就这2个比较重要<br/>
*还有个就是proxy,这些都是非常简单的配置<br/>
*dev-tool<br/>
*<br/>
*<br/>
(3)webpack的production的模式，这个要跟development的状态区分，development也需要打包，解析.vue，css，js和html的分离，但是development毕竟还没上线，本地开启webpack-dev-server跑页面，很多方便调试的工具都要配置上，而production的话，最终也要打包成js文件，css文件，但是呢这个文件需要compress，uglyfy等等，清除console的信息，最终传到服务器进行部署。<br/>
production模式注意要和dev区分开，首先dev模式开启node的express服务器，并且加上了webpack的中间件，同时dev也需要用到webpack的配置，因为相当于是把webpack打包的文件放进内存里面，而不是输出到磁盘中，通过与内存中的bundle文件进行交互。这里虽然用到了webpack的基本配置，但是dev模式和prod模式，他们还是有些地方要区分开，基本的laoder必须要一样，但是dev偏重于能够很好的定位调试信息，错误信息，文件归属信息，而production不必做这些，但是production需要一定程度的丑化代码，比如去掉console语句，去掉代码中间的crlf，可能还要压缩，compress，比如压缩成gzip文件进行线上部署。可是做到这些又要抛出一个问题，就是如何切换模式呢，那么这就要用到process.env.变量 == XXX。只要process在，这个全局的变量就在，然而webpack自己也有自己的全局空间，那就是DefinePlugin这插件，在这里面存储mode的状态，例如new DefinePlugin({env.mode:"development"})，那如何去切换呢，这个思路就是在script中，也就是package.json这个文件中的script中，在命令行进行-mode的配置，例如--mode=production这句话相当于在设置了process.env.NODE_ENV on DefinePlugin to development,production同理.它有没有改变真正的process.env.NODE_ENV，经过尝试发现，全局访问是undefined。
(4)webpack的细节优化配置，比如加scss解析,加eslint，加karmar，mocha,jasmine这种进行整合。<br/>
(5)vue官方配置方案分析（个人认为是考虑比较全面的方案）<br>
vue的官方配置分为了3个文件，分别是wepack.base.conf.js,webpack.dev.conf.js,webpack.prod.conf.js,这3个文件，分别特指，基础配置（主要是配置laoder，input），开发配置（基础配置merge开发额外需要的配置）,产品模式(一般翻译成生产模式),主要扩展了一些生产部署需要的额外的插件，也是基础配置merge开发额外需要的配置。下面一个一个说，每个配置具体用了什么配置。<br/>
(6)环境变量，有些时候需要再config.js切换development和production，这时候需要用到环境变量，如果想访问这个环境变量，就不能够只exports一个对象，而是要exports一个函数，具体见官方示例。
#### 基本配置 base<br/> ####
laoders:<br/>
(1)eslint-loader,代码规范化<br/>
(2)vue-loader:解析vue用的<br/>
(3)url-loader:设置了1MB的上限，如果超过了就放在img/name.[hash:7].[ext]，这里的name也可以带路径比如img/就会在打包的目标文件路径路径再加一个img路径，便于分类<br/>
(4)文件的后缀vue配置了3种情况，分别是图片，视频，字体。<br/>
图片:/\.(png|jpe?g|gif|svg)(\?.*)?$/,还考虑到了静态文件后面加了queryString<br/>
视频:/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/
webFont:/\.(woff2?|eot|ttf|otf)(\?.*)?$/<br/>
除了上述的几个loader，base还配置entry和output等信息，还配置了node的，来配置一些协议，比如net,tls
#### 开发模式 dev<br/> ####
在开发模式中，主要添加了devServer和plugin，以合并的形式进行解耦如devWebpackConfig = merge(baseConfig,{当前配置})<br/>
<pre>
devrtool:cheap-module-eval-source-map,
// 此处可以使用SourceMapDevToolPlugin插件，来进行更细粒度的配置。详见官方文档。devtool主要选择一种souce-map的映射风格来加强debugging的过程，不同的值会影响构建和重构建的速度。
// 针对于开发有4个模式，这里production的打包并不需要这个设置
// eval:每个模块都通过eval来执行并且//@souceURL.这个很快，主要的不足在于它不能够正确地显示行号，因为它直接映射到的是转换后的代码，而不是原始代码。
// eval-source-map:每个模块通过eval来执行并且添加了一个SourceMap作为DataUrl到eval（）里面。它比较慢，但是重build速度快，并且提供了正确的文件。行号也能够正确的映射到原始代码。这个配置为开发提供了最好的质量的souceMap，不过鉴于速度原因，视情况来配置
// cheap-eval-source-map，之所以加了cheap是因为它没有列的映射，并且它忽略了loader是的souceMap并且只显示转换后的文件到eval中。
// cheap-module-eval-source-map:很cheap很相似，但是这种情况Loaders的souceMap会有更便于查看的结果，但是loader Source Maps简化成了一个一行单映射。Vue选用的是这一种，这个细节以后再深入。
devServer:{
    clientLogLevel:'warning',当用inline-mode的时候，控制台将会展示信息，在重加载之前，出错之前，或者当热替换发生的时候，可能会太冗余，但是信息多还是便于调试的。
    historyApiFallback：vue中使用了rewrites，意思就是作为单页应用，如果没找到页面，就返回首页
    hot:热替换，必须配置，主要要在插件中引入webpack.hotModuleReplacementPlugin()
    contentBase：fase，处理静态文件的路径，vue没有使用它而是用copyWebpackPlugin
    compress：true，vue使用了它，让服务器压缩之后再返回资源gzip
    host：放在配置文件中
    port：放在配置文件中
    open：是否自动开启浏览器
    overlay：在浏览器中全屏幕显示当有编译错误或者警告的时候，默认是disabled，vue使用了true，这个就是那个弹窗的错误提示
    publicPath:相当于让浏览器重新改写路径，比如原始路径就是打包在其实的context下面，现在这里加一个/asset/
    那么访问的时候就需要http:localhost:9000/asset/xxx.html
    proxy:代理列表，vue把这个放在了配置文件中
    quiet:true,控制台只显示初始化的信息，错误和警告信息不显示，由于vue用了FriendlyErrorPlugin所以这里就没必要显示了。
    watchOption：{
        webpack通过文件系统来获取文件改变的通知
        poll：
    }
}
// 插件
// 设置全局变量
   DefinePlugin({
    'process.env':"配置dev.env",
   });
// HotModuleReplacementPlugin()热替换
// NamedModulesPlugin(),//目前这2个插件没看到
// NoEmitOnErrorsPlugin(),// 目前这个产检没看到
// HtmlWebpackPlugin(),生成模板的插件
// CopyWebpackPlugin(),拷贝自定义的静态文件

// vue这里用了一个promise进行输出，这个promise里面主要处理了portfinder，看看端口号是不是被占用了，如果被
// 占用了，返回错误，如果没有被占用，就继续设置配置一个FriendlyErrorsPlugin，最后再把dev的配置交给resolve
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})

</pre>
#### 生产模式 prod<br/> ####
生产模式还是老套路，开始先并入了处理css的loader，并且相比dev多加了一个extract的属性，意思是抽取css。<br/>
devtool：设置的为false<br/>
output：写在配置文件中<br/>
plugin:<br/>
<pre>
    // 定义全局变量
    DefinePlugin() {}
    // UglifyJsPlugin() 丑化js
    // ExtractTextPlugin() 抽取css然变成一个单独的文件，貌似wepack4中换成了MiniCss....
    // OptimizeCSSPlugin() 将重复申明的css进行去重
    // HtmlWebpackPlugin() 入口的html文件,生成在dist中的
    // HashedModuleIdsPlugin（），保持模块id稳定，当第三方模块没有改变的时候
    // ModuleConcatenationPlugin(),
    // CommonsChunkPlugin(),抽取第三方的库,在node_modules中的依赖js文件另外抽取出来
    // CommonsChunkPlugin(),使用了2次，第二次配置了manifest，只要是把runtime和module manifest抽
    抽取到文件中，防止当app bundle更新后vendor的hash更新
    // CommonsChunkPlugin(),这一次又使用了一次，主要是把共享的代码单独放在一个文件里面，这样的话能够保证文件体积小
    //CopyWebpackPlugin(),这个插件主要是把静态文件移到build的文件夹中
    // CompressionWebpackPlugin()，把文件压缩成gzip这是作为可选项的，进一步节约上传的带宽
    // BundleAnalyzerPlugin(),打包分析报告的插件，这个也是在配置文件中可选的
    // 最后vue官方打包，并没有走webpackcli而是用的nodejs的api
    通过webpack（Pordconfig，（err，stats）=> {
          进行手动打包，并且还引入了chalk包，来进行彩色显示
    }）
</pre>

## 总结 ##
注意一些配置项的驼峰大小写，配置错了，基本就忽略了。作为生产环境和开发环境vue官方并没有去设置什么mode还是在命令行进行环境的配置,而是不同的环境配置不同的配置文件,比如base.config无论是生产环境还是开发环境都要的,然后通过merge来进行合并,比如dev表示开发模式中应该要有的配置比如devtool，然后prod.config是生产环境需要的,通过合并他们,来做到不同环境输出不同的东西。还有个要区分下,实际上开发模式只是跑了个dev-server,打包的过程和最终的结果全部在内存中。
## 展望 ##
自己写一个loader或者plugin试一试，想把webpack的所有细节都弄出来，不现实，后期有需要的话，需要配置再看吧。<br/>
loader比较简单，plugin有点复杂，下一步任务是能够切换development和production之间的配置，至于lint，test以后再说吧。
## 展望续 ##
这里把lint和test整合进webpack。
### 遇到的几个坑 ###
这里先配置了vuex和vue-router，这2个插件相对较为简单，首先vue-router中的<route-view>这个标签需要用到运行时的vue.js,原因是单纯地引入vue的话，通过源码的分析可以知道，源码是npm拆分了很多文件，<route-view>需要在运行时的函数去解析，webpack环境中打包的过程实际上仅仅分析依赖，在打包的过程中运行时的complier还不能用，所以在alias里面把vue的路径换成了vue/dist/vue.esm.js这个路径，这个文件属于打包后的vue文件，该有的方法都会有
### 配置eslint ###
首先需要有eslint-loader,npm install  eslint-loader --save-dev,eslint首先要解决的就是import是保留字，import blablabla souceType，，这些的解决方式，就是在eslintrc中首先加入env:{es6:true,node:true},然后再加上一个parse:barbel-eslint,最后说在后面的是eslint，babel-eslint必须全局安装，这样才可以--fix,但是目前的问题在于，并没有很好的很直观的错误提示。
### 配置babel ###
首先按照官方文档配置，但是babel需要7.00版本的，后来就安装了一个babl e7.0 bridgeXXX类似于这个包npm install babel-core@7.0.0-bridge.0 --save-dev,这样就解决了需要bable 7.00的版本，网上还有人说，以后babel都需要用@babelXXX，所以把babel开头的都替换掉，然而这种方式还没试，不过前面一个方法已经能解决问题。
### 配置karmar ###

## 配置build环境 ##
### 配置uglify ###
### 其他的优化还没想到 ###