import 'dotenv/config';
import { client } from '../src/lib/db';

async function cleanDatabase() {
  console.log('🧹 Cleaning database...\n');

  try {
    // Drop tables in correct order (to respect foreign key constraints)
    await client`DROP TABLE IF EXISTS post_categories CASCADE`;
    console.log('✅ Dropped post_categories table');

    await client`DROP TABLE IF EXISTS posts CASCADE`;
    console.log('✅ Dropped posts table');

    await client`DROP TABLE IF EXISTS categories CASCADE`;
    console.log('✅ Dropped categories table');

    console.log('\n✨ Database cleaned successfully!');
    console.log('📝 Next step: Run "npm run db:push" to recreate tables');
  } catch (error) {
    console.error('❌ Error cleaning database:', error);
    throw error;
  } finally {
    await client.end();
  }
}

cleanDatabase();
