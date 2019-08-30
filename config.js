
// 

module.exports = {
    // blog mate
    blogMeta: {
        name: 'heloook', // copyright 显示
        title: `heloook's blog`, //网站标题
        pageSize: 7, // 每页多少篇文章
        description: `All things about heloook`, // 网站描述 seo
        siteUrl: `https://www.heloook.com`, // 站点URL
        aboutPostSlug: `10a70927d25a43d19acf14e0d36354e7`, //没有单独的about页面，about页面指向文章。
        avatar: '41546411364_.pic.jpg', // src/static 目录下
        // 社交帐号配置，显示在页面最下方。
        me: {
            github: 'hpl2do' // github 用户名称
        }
    },

    // 博客数据源 目前只适配notion
    blog: {
        sourceType: 'notion',
        url: 'https://www.notion.so/heloook/b7a75db043974aedb6087e04215d508a?v=5e75d0e74c34494982cce55f6588e7d4', // notion中文章表的链接
        // 建议开启，可以大大提高build速度
        // 访问 https://github.com/settings/tokens 获取token 
        // export GitHubToken='yourtokenhere'
        openGithubCache: false, // 开启此配置后，notion页面的数据会缓存到github仓库。需要在环境变量中配置 GitHubToken
        github: {
            username: 'hpl2do', // github 用户名
            repo: 'blog', // 作为blog缓存数据仓库的名称
            branch: 'master' // 作为blog缓存数据仓库的分支
        },
        search: {
            open: false,
            url: '/.netlify/functions/search'
        }
    },

    // 友链
    friendLink: {
        sourceType: 'notion',
        url: 'https://www.notion.so/heloook/2cc5b020ec914b6cb5cb8e8085983a61?v=fb63436d7e434857996bb0a47abc389e', // notion中友链表的链接
    },

    // 下面的是可选组件
    // 评论
    comment: {
        open: true, //默认关闭，仅适配disqus
        sourceType: 'disqus',
        disqus: {
            disqusShortname: 'my-blog-ngtr4qzpmb' // 你的短域名
        }
    },

    // 番剧
    bangumi: {
        open: false, // 默认关闭
        sourceType: 'bilibili',
        url: 'http://space.bilibili.com/ajax/Bangumi/getList?mid=22539301&page=1', // 替换自己为自己的mid 
    },

    // 格言//无效
    aphorisms: {
        open: true, // 默认关闭 需要api
        sourceType: 'notion',
        url: 'https://www.notion.so/heloook/f38854123bac4aebb2955195c9317fcb?v=d2f3e81650284812a59defdfa282e661', // notion 表格地址
        // 返回格式参见上面链接的内容
    },

    draw: {
        open: false,
        url: ""
    },
    moments: {
        open: false,
        url: ""
    },

    // 正在播放的音乐
    // 正在玩的游戏
    now: {
        open: false, // 默认关闭。需要接口
    },

    book: {
        open: false, // 默认关闭
        url: 'https://www.notion.so/98717bf8ad57434eafd9a65277403c33?v=fa4f00bb9b5b492fb23157f8d5df471f', // 书单表格地址
    },

    // music 
    music: {
        open: false, // 默认关闭。需要个人 spotify api
        url: 'https://api.gine.me' // 数据格式可参考此链接内容
    },

    // game
    game: {
        open: false, // 默认关闭。需要个人 steam api
    },

    // seo 
    seo: {
        open: true, // 如果部署在netlify上，为了更好的seo，请开启此选项
        siteUrl: 'https://www.heloook.com', // 站点url
        netlifyUrl: 'https://heloook.netlify.com' //netlify分配的url
    },

    // sitemap
    sitemap: {
        open: false, // 默认关闭，站点地图 seo友好
    },
    // Google Analytics
    ga: {
        open: false, // 默认关闭
        trackingId: 'UA-xxxxxxxx-x', // ga 分配的追踪代码
    },
    // google_ad_client
    google_ad_client: {
        open: false,
        clientId: 'pub-xxxxxxxxxxxx',
    },
    // PWA 优化 
    pwa: {
        open: false, //默认关闭

        // 配置参见 gatsby-plugin-manifest 插件文档
        conf: {
            name: `Mayne's Blog`,
            short_name: `Mayne's Blog`,
            start_url: `/`,
            background_color: `#ffffff`,
            theme_color: `#ffffff`,
            display: `standalone`,
            icon: `src/static/41546411364_.pic.jpg`, // This path is relative to the root of the site.
        }
    },
    rss: {
        open: false, //默认关闭
        // 配置参见 gatsby-plugin-feed 插件文档
        conf: {
            query: `
                {
                  site {
                    siteMetadata {
                      title
                      description
                      siteUrl
                      site_url: siteUrl
                    }
                  }
                }
              `,
            feeds: [
                {
                    serialize: ({ query: { site, allPost } }) => {
                        return allPost.edges.map(edge => {
                            return {
                                title: edge.node.name,
                                description: edge.node.brief,
                                date: edge.node.public_date,
                                url: site.siteMetadata.siteUrl + '/' + edge.node.slug,
                                guid: site.siteMetadata.siteUrl + '/' + edge.node.slug,
                                custom_elements: [{ "content:encoded": edge.node.html }],
                            }
                        })
                    },
                    query: `
                    {
                      allPost(limit: 1000,sort: { order: DESC, fields: [public_date] },) {
                        edges {
                          node {
                            brief
                            html
                            slug 
                            name
                            public_date
                          }
                        }
                      }
                    }
                  `,
                    output: "/feed",
                    title: "GiNE RSS Feed",
                },
            ],
        },
    }
}
