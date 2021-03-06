package org.module.sys.util.idgenerator;



import org.eredlab.g4.ccl.id.generator.DefaultIDGenerator;

/**
 * ID生成器 静态类解决多线程并发访问生成ID的问题
 * 此类第一次实例化会执行所有的static代码块，如果想按需加载这些ID生成器，则应该一个ID写一个静态类就可以
 * 
 * @author XiongChun
 * @since 2010-09-16s
 */
public class IDHelper {
	/**
	 * B_ID收费单号
	 */
	private static DefaultIDGenerator defaultIDGenerator_b_id = null;
	
	/**
	 * I_ID入网编号
	 */
	private static DefaultIDGenerator defaultIDGenerator_i_id = null;

	/**
	 * Permission_ID小区授权编号
	 */
	private static DefaultIDGenerator defaultIDGenerator_permission_id = null;
	
	
	
	static {
		IdGenerator idGenerator_userid = new IdGenerator();
		idGenerator_userid.setFieldname("B_ID");
		defaultIDGenerator_b_id = idGenerator_userid.getDefaultIDGenerator();
	}
	
	static {
		IdGenerator idGenerator_fileid = new IdGenerator();
		idGenerator_fileid.setFieldname("I_ID");
		defaultIDGenerator_i_id = idGenerator_fileid.getDefaultIDGenerator();
	}

	static {
		IdGenerator idGenerator_fileid = new IdGenerator();
		idGenerator_fileid.setFieldname("Permission_ID");
		defaultIDGenerator_permission_id = idGenerator_fileid.getDefaultIDGenerator();
	}

	
	
	/**
	 * 返回B_ID
	 * 
	 * @return
	 */
	public static String getB_ID() {
		return defaultIDGenerator_b_id.create();
	}
	
	/**
	 * 返回I_ID
	 * 
	 * @return
	 */
	public static String getFileID() {
		return defaultIDGenerator_i_id.create();
	}

	/**
	 * 返回Permission_ID
	 *
	 * @return
	 */
	public static String getPermissionID() {
		return defaultIDGenerator_permission_id.create();
	}
}
