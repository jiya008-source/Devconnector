const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('config');

const User = require('./models/User');
const Profile = require('./models/Profile');
const Post = require('./models/Post');

const MONGO_URI = config.get('MONGO_URI');

const seed = async () => {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected...');

    await User.deleteMany({});
    await Profile.deleteMany({});
    await Post.deleteMany({});
    console.log('Cleared existing data...');

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    const users = await User.insertMany([
        {
            name: 'Arjun Mehta',
            email: 'arjun@demo.com',
            password,
            avatar: 'https://i.pravatar.cc/150?img=12'
        },
        {
            name: 'Sara Lindqvist',
            email: 'sara@demo.com',
            password,
            avatar: 'https://i.pravatar.cc/150?img=47'
        },
        {
            name: 'David Park',
            email: 'david@demo.com',
            password,
            avatar: 'https://i.pravatar.cc/150?img=53'
        },
        {
            name: 'Aisha Nwosu',
            email: 'aisha@demo.com',
            password,
            avatar: 'https://i.pravatar.cc/150?img=41'
        },
        {
            name: 'Lucas Ferreira',
            email: 'lucas@demo.com',
            password,
            avatar: 'https://i.pravatar.cc/150?img=67'
        }
    ]);

    console.log('Users created...');

    await Profile.insertMany([
        {
            user: users[0]._id,
            handle: 'arjunmehta',
            company: 'Shopify',
            website: 'https://arjunmehta.dev',
            location: 'Toronto, Canada',
            status: 'Senior Full Stack Developer',
            skills: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'TypeScript'],
            bio: 'Full stack engineer at Shopify building merchant tools at scale. Love distributed systems, clean APIs, and good coffee.',
            githubusername: 'arjunmehta',
            experience: [
                {
                    title: 'Senior Full Stack Engineer',
                    company: 'Shopify',
                    location: 'Toronto, Canada',
                    from: new Date('2021-04-01'),
                    current: true,
                    description: 'Building checkout and merchant dashboard features serving millions of stores globally.'
                },
                {
                    title: 'Full Stack Developer',
                    company: 'Wealthsimple',
                    location: 'Toronto, Canada',
                    from: new Date('2019-01-01'),
                    to: new Date('2021-03-01'),
                    current: false,
                    description: 'Built trading and portfolio management features for the retail investing platform.'
                }
            ],
            education: [
                {
                    school: 'University of Waterloo',
                    degree: 'B.S.',
                    fieldofstudy: 'Computer Science',
                    from: new Date('2015-09-01'),
                    to: new Date('2019-04-01'),
                    current: false
                }
            ],
            social: {
                twitter: 'https://twitter.com/arjunmehta',
                linkedin: 'https://linkedin.com/in/arjunmehta',
                github: 'https://github.com/arjunmehta'
            }
        },
        {
            user: users[1]._id,
            handle: 'saralindqvist',
            company: 'Spotify',
            website: 'https://saralindqvist.io',
            location: 'Stockholm, Sweden',
            status: 'Full Stack Developer',
            skills: ['React', 'Kotlin', 'Spring Boot', 'Kafka', 'AWS', 'GraphQL'],
            bio: 'Full stack dev at Spotify working on the creator platform. Previously helped scale a fintech startup from 0 to 1M users.',
            githubusername: 'saralindqvist',
            experience: [
                {
                    title: 'Full Stack Engineer',
                    company: 'Spotify',
                    location: 'Stockholm, Sweden',
                    from: new Date('2022-02-01'),
                    current: true,
                    description: 'Building tools for podcast creators and artists to manage and distribute their content.'
                },
                {
                    title: 'Software Engineer',
                    company: 'Klarna',
                    location: 'Stockholm, Sweden',
                    from: new Date('2019-06-01'),
                    to: new Date('2022-01-01'),
                    current: false,
                    description: 'Worked on payment flows and fraud detection systems.'
                }
            ],
            education: [
                {
                    school: 'KTH Royal Institute of Technology',
                    degree: 'M.S.',
                    fieldofstudy: 'Software Engineering',
                    from: new Date('2017-09-01'),
                    to: new Date('2019-06-01'),
                    current: false
                }
            ],
            social: {
                linkedin: 'https://linkedin.com/in/saralindqvist',
                github: 'https://github.com/saralindqvist'
            }
        },
        {
            user: users[2]._id,
            handle: 'davidpark',
            company: 'Netflix',
            website: 'https://davidpark.dev',
            location: 'Los Angeles, CA',
            status: 'Full Stack Developer',
            skills: ['React', 'Java', 'Spring', 'Cassandra', 'AWS', 'Microservices'],
            bio: 'Full stack engineer at Netflix on the streaming infrastructure team. Obsessed with system design, performance, and building things that scale.',
            githubusername: 'davidpark',
            experience: [
                {
                    title: 'Software Engineer II',
                    company: 'Netflix',
                    location: 'Los Angeles, CA',
                    from: new Date('2020-09-01'),
                    current: true,
                    description: 'Working on the content delivery and streaming pipeline serving 200M+ subscribers.'
                },
                {
                    title: 'Software Engineer',
                    company: 'Hulu',
                    location: 'Santa Monica, CA',
                    from: new Date('2018-07-01'),
                    to: new Date('2020-08-01'),
                    current: false,
                    description: 'Built live TV features and ad integration systems.'
                }
            ],
            education: [
                {
                    school: 'UCLA',
                    degree: 'B.S.',
                    fieldofstudy: 'Computer Science',
                    from: new Date('2014-09-01'),
                    to: new Date('2018-06-01'),
                    current: false
                }
            ],
            social: {
                twitter: 'https://twitter.com/davidpark',
                linkedin: 'https://linkedin.com/in/davidpark'
            }
        },
        {
            user: users[3]._id,
            handle: 'aishanwosu',
            company: 'Andela',
            website: 'https://aishanwosu.dev',
            location: 'Lagos, Nigeria',
            status: 'Full Stack Developer',
            skills: ['Vue.js', 'Django', 'Python', 'MySQL', 'Docker', 'CI/CD'],
            bio: 'Full stack developer and engineering mentor at Andela. Passionate about growing the African tech ecosystem and building products that matter.',
            githubusername: 'aishanwosu',
            experience: [
                {
                    title: 'Senior Software Engineer',
                    company: 'Andela',
                    location: 'Lagos, Nigeria',
                    from: new Date('2020-01-01'),
                    current: true,
                    description: 'Building internal developer tools and mentoring junior engineers across the continent.'
                },
                {
                    title: 'Full Stack Developer',
                    company: 'Paystack',
                    location: 'Lagos, Nigeria',
                    from: new Date('2017-05-01'),
                    to: new Date('2019-12-01'),
                    current: false,
                    description: 'Worked on the merchant dashboard and payment APIs before Paystack was acquired by Stripe.'
                }
            ],
            education: [
                {
                    school: 'University of Lagos',
                    degree: 'B.S.',
                    fieldofstudy: 'Computer Science',
                    from: new Date('2013-09-01'),
                    to: new Date('2017-06-01'),
                    current: false
                }
            ],
            social: {
                twitter: 'https://twitter.com/aishanwosu',
                linkedin: 'https://linkedin.com/in/aishanwosu',
                github: 'https://github.com/aishanwosu'
            }
        },
        {
            user: users[4]._id,
            handle: 'lucasferreira',
            company: 'Nubank',
            website: 'https://lucasferreira.io',
            location: 'São Paulo, Brazil',
            status: 'Full Stack Developer',
            skills: ['React', 'Clojure', 'Datomic', 'Kubernetes', 'GCP', 'TypeScript'],
            bio: 'Full stack engineer at Nubank. I work across the entire stack — from React frontends to Clojure microservices. Big believer in functional programming and immutable data.',
            githubusername: 'lucasferreira',
            experience: [
                {
                    title: 'Software Engineer',
                    company: 'Nubank',
                    location: 'São Paulo, Brazil',
                    from: new Date('2021-06-01'),
                    current: true,
                    description: 'Building credit card and personal loan features for Latin America\'s largest fintech.'
                },
                {
                    title: 'Full Stack Developer',
                    company: 'iFood',
                    location: 'São Paulo, Brazil',
                    from: new Date('2019-03-01'),
                    to: new Date('2021-05-01'),
                    current: false,
                    description: 'Worked on the restaurant partner portal and order management system.'
                }
            ],
            education: [
                {
                    school: 'USP - University of São Paulo',
                    degree: 'B.S.',
                    fieldofstudy: 'Computer Engineering',
                    from: new Date('2015-03-01'),
                    to: new Date('2019-12-01'),
                    current: false
                }
            ],
            social: {
                twitter: 'https://twitter.com/lucasferreira',
                linkedin: 'https://linkedin.com/in/lucasferreira',
                github: 'https://github.com/lucasferreira'
            }
        }
    ]);

    console.log('Profiles created...');

    await Post.insertMany([
        {
            user: users[0]._id,
            text: 'We just migrated a critical Shopify service from REST to GraphQL and the DX improvement is real. Fewer round trips, typed responses, and our frontend team stopped pinging me asking "what fields does this endpoint return?" Worth every hour of the migration. Anyone else made this switch recently?',
            name: users[0].name,
            avatar: users[0].avatar,
            likes: [
                { user: users[1]._id },
                { user: users[2]._id },
                { user: users[3]._id }
            ],
            comments: [
                {
                    user: users[1]._id,
                    text: 'We use GraphQL at Spotify for the creator platform and the self-documenting nature alone is worth it. What did you use — Apollo or something else?',
                    name: users[1].name,
                    avatar: users[1].avatar,
                    date: new Date('2024-03-15')
                },
                {
                    user: users[4]._id,
                    text: 'At Nubank we went the other direction — from GraphQL back to REST for some internal services. GraphQL shines for client-facing APIs but adds overhead for internal microservice communication.',
                    name: users[4].name,
                    avatar: users[4].avatar,
                    date: new Date('2024-03-15')
                },
                {
                    user: users[2]._id,
                    text: 'The "what fields does this endpoint return" problem is so real. GraphQL introspection is underrated.',
                    name: users[2].name,
                    avatar: users[2].avatar,
                    date: new Date('2024-03-16')
                }
            ]
        },
        {
            user: users[2]._id,
            text: 'System design tip that took me too long to learn: stop designing for the scale you don\'t have yet. I see so many engineers reach for Kafka, Kubernetes, and microservices on day one. A well-structured monolith will outperform a poorly designed distributed system every single time. Build for today, architect for tomorrow.',
            name: users[2].name,
            avatar: users[2].avatar,
            likes: [
                { user: users[0]._id },
                { user: users[1]._id },
                { user: users[3]._id },
                { user: users[4]._id }
            ],
            comments: [
                {
                    user: users[3]._id,
                    text: 'This is something I actively teach junior devs at Andela. Premature optimization and premature architecture are both traps. Solve the problem in front of you.',
                    name: users[3].name,
                    avatar: users[3].avatar,
                    date: new Date('2024-03-14')
                },
                {
                    user: users[0]._id,
                    text: 'Shopify ran on a Rails monolith for years before breaking things out. That foundation was what made scaling possible. 100% agree.',
                    name: users[0].name,
                    avatar: users[0].avatar,
                    date: new Date('2024-03-14')
                }
            ]
        },
        {
            user: users[1]._id,
            text: 'Unpopular opinion: most teams don\'t need a custom design system. They need to use an existing one consistently. I\'ve watched teams spend 6 months building a component library from scratch when Radix + Tailwind would have shipped the product in 6 weeks. Know what problem you\'re actually solving.',
            name: users[1].name,
            avatar: users[1].avatar,
            likes: [
                { user: users[0]._id },
                { user: users[2]._id },
                { user: users[4]._id }
            ],
            comments: [
                {
                    user: users[3]._id,
                    text: 'Counterpoint: at scale, a custom design system pays for itself in consistency and brand control. But yeah for most startups it\'s absolutely overkill.',
                    name: users[3].name,
                    avatar: users[3].avatar,
                    date: new Date('2024-03-13')
                },
                {
                    user: users[2]._id,
                    text: 'As a freelancer I always push clients toward existing systems first. The maintenance burden of a custom library is real and usually underestimated.',
                    name: users[2].name,
                    avatar: users[2].avatar,
                    date: new Date('2024-03-13')
                }
            ]
        },
        {
            user: users[3]._id,
            text: 'Something I\'ve noticed mentoring developers across Africa: the engineers who grow fastest aren\'t the ones who know the most — they\'re the ones who communicate the clearest. Write better PRs. Ask sharper questions. Document your decisions. Technical skill gets you in the room. Communication keeps you there.',
            name: users[3].name,
            avatar: users[3].avatar,
            likes: [
                { user: users[0]._id },
                { user: users[1]._id },
                { user: users[2]._id },
                { user: users[4]._id }
            ],
            comments: [
                {
                    user: users[1]._id,
                    text: 'This is true everywhere, not just Africa. The best engineers I\'ve worked with at Spotify are all exceptional communicators first.',
                    name: users[1].name,
                    avatar: users[1].avatar,
                    date: new Date('2024-03-12')
                },
                {
                    user: users[0]._id,
                    text: 'Writing good PR descriptions is a skill I wish was taught earlier. It\'s basically async communication and it matters enormously in remote teams.',
                    name: users[0].name,
                    avatar: users[0].avatar,
                    date: new Date('2024-03-12')
                }
            ]
        },
        {
            user: users[4]._id,
            text: 'Six months into using Clojure professionally at Nubank and my relationship with state has fundamentally changed. Immutable data by default forces you to think differently about every problem. Coming back to JavaScript now feels like trying to build with wet concrete. Functional programming ruined me (in the best way).',
            name: users[4].name,
            avatar: users[4].avatar,
            likes: [
                { user: users[0]._id },
                { user: users[1]._id }
            ],
            comments: [
                {
                    user: users[2]._id,
                    text: 'Java dev here — I get this with streams and Optional. Once you stop mutating state everywhere, going back feels wrong. Have you looked at Elixir? Similar mindset.',
                    name: users[2].name,
                    avatar: users[2].avatar,
                    date: new Date('2024-03-11')
                },
                {
                    user: users[0]._id,
                    text: 'This is why I love Redux even when people call it verbose. Predictable state changes are worth the boilerplate.',
                    name: users[0].name,
                    avatar: users[0].avatar,
                    date: new Date('2024-03-11')
                }
            ]
        }
    ]);

    console.log('Posts created...');
    console.log('\n✅ Seed complete!');
    console.log('----------------------------');
    console.log('Demo credentials (all use password: password123)');
    console.log('arjun@demo.com  — Senior Full Stack @ Shopify');
    console.log('sara@demo.com   — Full Stack @ Spotify');
    console.log('david@demo.com  — Full Stack @ Netflix');
    console.log('aisha@demo.com  — Full Stack @ Andela');
    console.log('lucas@demo.com  — Full Stack @ Nubank');

    mongoose.connection.close();
};

seed().catch(err => {
    console.error(err);
    mongoose.connection.close();
});