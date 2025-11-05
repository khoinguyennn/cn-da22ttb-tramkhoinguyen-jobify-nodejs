import { pool } from '@/config/database';
import { Company } from '@/types';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class CompanyRepository {
  async findById(id: number): Promise<Company | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT c.*, p.name as provinceName, p.nameWithType as provinceFullName 
       FROM companies c 
       LEFT JOIN provinces p ON c.idProvince = p.id 
       WHERE c.id = ?`,
      [id]
    );
    
    return rows.length > 0 ? (rows[0] as Company) : null;
  }

  async findByEmail(email: string): Promise<Company | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM companies WHERE email = ?',
      [email]
    );
    
    return rows.length > 0 ? (rows[0] as Company) : null;
  }

  async findAll(page: number, limit: number): Promise<{ companies: Company[], total: number }> {
    const offset = (page - 1) * limit;

    // Validate parameters
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      throw new Error(`Invalid pagination parameters: page=${page}, limit=${limit}`);
    }
    
    // Get total count
    const [countRows] = await pool.execute<RowDataPacket[]>(
      'SELECT COUNT(*) as total FROM companies'
    );
    const total = countRows[0].total;

    // Get paginated companies
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT c.*, p.name as provinceName, p.nameWithType as provinceFullName 
       FROM companies c 
       LEFT JOIN provinces p ON c.idProvince = p.id 
       ORDER BY c.nameCompany ASC 
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    return {
      companies: rows as Company[],
      total,
    };
  }

  async updateProfile(id: number, companyData: Partial<Company>): Promise<boolean> {
    const fields: string[] = [];
    const values: any[] = [];

    // Dynamically build update query
    Object.entries(companyData).forEach(([key, value]) => {
      if (value !== undefined && key !== 'id' && key !== 'password') {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (fields.length === 0) {
      return false;
    }

    values.push(id);

    const [result] = await pool.execute<ResultSetHeader>(
      `UPDATE companies SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    return result.affectedRows > 0;
  }

  async updateIntro(id: number, intro: string): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'UPDATE companies SET intro = ? WHERE id = ?',
      [intro, id]
    );

    return result.affectedRows > 0;
  }

  async updateAvatar(id: number, avatarPic: string): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'UPDATE companies SET avatarPic = ? WHERE id = ?',
      [avatarPic, id]
    );

    return result.affectedRows > 0;
  }
}

export const companyRepository = new CompanyRepository();

