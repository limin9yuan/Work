package com.bootdo.system.controller;

import java.text.DecimalFormat;
import java.util.*;

import com.bootdo.common.domain.MainDO;
import com.bootdo.common.utils.Query;
import com.bootdo.contract.domain.ContractDO;
import com.bootdo.contract.service.ContractService;
import com.bootdo.system.domain.UserDO;
import com.bootdo.system.service.UserService;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.LogoutAware;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.bootdo.common.annotation.Log;
import com.bootdo.common.controller.BaseController;
import com.bootdo.common.domain.Tree;
import com.bootdo.common.utils.MD5Utils;
import com.bootdo.common.utils.R;
import com.bootdo.common.utils.ShiroUtils;
import com.bootdo.system.domain.MenuDO;
import com.bootdo.system.service.MenuService;

@Controller
public class LoginController extends BaseController {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	MenuService menuService;
    @Autowired
    private ContractService contractService;
    @Autowired
    UserService userService;

	@GetMapping({ "/", "" })
	String welcome(Model model) {
		return "redirect:/login";
	}

	@Log("请求访问主页")
	@GetMapping({ "/index" })
	String index(Model model) {
		List<Tree<MenuDO>> menus = menuService.listMenuTreeAll(getUserId());
		List<Tree<MenuDO>> menuRoots = menuService.listMenuTreeRoot(getUserId());
		model.addAttribute("menus", menus);
		model.addAttribute("menuRoots", menuRoots);
		/*for(int i=0;i<menus.size();i++){
			Tree<MenuDO> v = (Tree<MenuDO>)menus.get(i);
			System.out.println("*******"+v.getText());
			List<Tree<MenuDO>> vt = v.getChildren();
			for(int j=0;j<vt.size();j++){
				Tree<MenuDO> vtt = (Tree<MenuDO>)vt.get(j);
				System.out.println("*******------"+vtt.getText());
				List<Tree<MenuDO>> vtv = vtt.getChildren();
				for(int s=0;s<vtv.size();s++){
					Tree<MenuDO> vt1 = (Tree<MenuDO>)vtv.get(s);
					System.out.println("**************-------------"+vt1.getText());
					
				}
				
			}
			
		}*/
		model.addAttribute("name", getUser().getName());
		logger.info(getUser().getName());
		return "index_v1";
	}

	@GetMapping("/login")
	String login() {
		return "login";
	}

	@Log("登录")
	@PostMapping("/login")
	@ResponseBody
	R ajaxLogin(String username, String password, @RequestParam Map<String, Object> params) {
       UserDO user = userService.getErrorCount(username);
        user.setUsername(username);
		password = MD5Utils.encrypt(username, password);
		UsernamePasswordToken token = new UsernamePasswordToken(username, password);
		Subject subject = SecurityUtils.getSubject();
		try {
          subject.login(token);
          if (user.getLoginErrorCount() >= 6){
              return R.error("请联系管理员");

          }
          params.put("username", username);
          userService.resetErrorCount(user);

			return R.ok();
		} catch (AuthenticationException e) {
          params.put("username", username);
          userService.updateErrorCount(user);
          if (user.getLoginErrorCount() >= 6){
              return R.error("请联系管理员");

          }

          return R.error("用户或密码错误");
		}
	}

	@GetMapping("/logout")
	String logout() {
		ShiroUtils.logout();
		return "redirect:/login";
	}

	@GetMapping("/main")
	String main(@RequestParam Map<String, Object> params, Model model) {
	    double janIncome=0; double febIncome=0; double marIncome=0; double aprIncome=0; double mayIncome=0;
	    double junIncome=0; double julIncome=0; double augIncome=0; double sepIncome=0; double octIncome=0;
	    double novIncome=0; double decIncome=0; double totalIncome=0;
	    double janCost=0; double febCost=0; double marCost=0; double aprCost=0; double mayCost=0;
	    double junCost=0; double julCost=0; double augCost=0; double sepCost=0; double octCost=0;
	    double novCost=0; double decCost=0; double totalCost=0;
       double janNet=0; double febNet=0; double marNet=0; double aprNet=0; double mayNet=0;
       double junNet=0; double julNet=0; double augNet=0; double sepNet=0; double octNet=0;
       double novNet=0; double decNet=0; double totalNet=0;
       Calendar date = Calendar.getInstance();
       String currentYear = String.valueOf(date.get(Calendar.YEAR));
       params.put("offset",1);
       params.put("limit",2);
       params.put("currentYear", currentYear);
       Query queryGetDataList = new Query(params);
       List<MainDO> contractGetDataList = contractService.getDataList(queryGetDataList);
       for (int i=0; i<contractGetDataList.size();i++){
            if (i == 0){

                janIncome = Double.parseDouble(contractGetDataList.get(0).getJanuary()==null?
                        "0" : contractGetDataList.get(0).getJanuary());
                febIncome = Double.parseDouble( contractGetDataList.get(0).getFebruary()==null?
                        "0" : contractGetDataList.get(0).getFebruary());
                marIncome = Double.parseDouble( contractGetDataList.get(0).getMarch()==null?
                        "0" : contractGetDataList.get(0).getMarch());
                aprIncome = Double.parseDouble( contractGetDataList.get(0).getApril()==null?
                        "0" : contractGetDataList.get(0).getApril());
                mayIncome = Double.parseDouble( contractGetDataList.get(0).getMay()==null?
                        "0" : contractGetDataList.get(0).getMay());
                junIncome = Double.parseDouble( contractGetDataList.get(0).getJune()==null?
                        "0" : contractGetDataList.get(0).getJune());
                julIncome = Double.parseDouble( contractGetDataList.get(0).getJuly()==null?
                        "0" : contractGetDataList.get(0).getJuly());
                augIncome = Double.parseDouble( contractGetDataList.get(0).getAugust()==null?
                        "0" : contractGetDataList.get(0).getAugust());
                sepIncome = Double.parseDouble( contractGetDataList.get(0).getSeptember()==null?
                        "0" : contractGetDataList.get(0).getSeptember());
                octIncome = Double.parseDouble( contractGetDataList.get(0).getOctober()==null?
                        "0" : contractGetDataList.get(0).getOctober());
                novIncome = Double.parseDouble( contractGetDataList.get(0).getNovember()==null?
                        "0" : contractGetDataList.get(0).getNovember());
                decIncome = Double.parseDouble( contractGetDataList.get(0).getDecember()==null?
                        "0" : contractGetDataList.get(0).getDecember());
                totalIncome = Double.parseDouble( contractGetDataList.get(0).getTotal()==null?
                        "0" : contractGetDataList.get(0).getTotal());
            }
            if (i == 2){
                janCost = Double.parseDouble( contractGetDataList.get(2).getJanuary()==null?
                        "0":contractGetDataList.get(2).getJanuary());
                febCost = Double.parseDouble( contractGetDataList.get(2).getFebruary()==null?
                        "0":contractGetDataList.get(2).getFebruary());
                marCost = Double.parseDouble( contractGetDataList.get(2).getMarch()==null?
                        "0":contractGetDataList.get(2).getMarch());
                aprCost = Double.parseDouble( contractGetDataList.get(2).getApril()==null?
                        "0":contractGetDataList.get(2).getApril());
                mayCost = Double.parseDouble( contractGetDataList.get(2).getMay()==null?
                        "0":contractGetDataList.get(2).getMay());
                junCost = Double.parseDouble( contractGetDataList.get(2).getJune()==null?
                        "0":contractGetDataList.get(2).getJune());
                julCost = Double.parseDouble( contractGetDataList.get(2).getJuly()==null?
                        "0":contractGetDataList.get(2).getJuly());
                augCost = Double.parseDouble( contractGetDataList.get(2).getAugust()==null?
                        "0":contractGetDataList.get(2).getAugust());
                sepCost = Double.parseDouble( contractGetDataList.get(2).getSeptember()==null?
                        "0":contractGetDataList.get(2).getSeptember());
                octCost = Double.parseDouble( contractGetDataList.get(2).getOctober()==null?
                        "0":contractGetDataList.get(2).getOctober());
                novCost = Double.parseDouble( contractGetDataList.get(2).getNovember()==null?
                        "0":contractGetDataList.get(2).getNovember());
                decCost = Double.parseDouble( contractGetDataList.get(2).getDecember()==null?
                        "0":contractGetDataList.get(2).getDecember());
                totalCost = Double.parseDouble( contractGetDataList.get(2).getTotal()==null?
                        "0":contractGetDataList.get(2).getTotal());
            }
            if (i == 3){
                janCost = janCost + Double.parseDouble( contractGetDataList.get(3).getJanuary()==null?
                        "0":contractGetDataList.get(3).getJanuary());
                febCost = febCost + Double.parseDouble( contractGetDataList.get(3).getFebruary()==null?
                        "0":contractGetDataList.get(3).getFebruary());
                marCost = marCost + Double.parseDouble( contractGetDataList.get(3).getMarch()==null?
                        "0":contractGetDataList.get(3).getMarch());
                aprCost = aprCost + Double.parseDouble( contractGetDataList.get(3).getApril()==null?
                        "0":contractGetDataList.get(3).getApril());
                mayCost = mayCost + Double.parseDouble( contractGetDataList.get(3).getMay()==null?
                        "0":contractGetDataList.get(3).getMay());
                junCost = junCost + Double.parseDouble( contractGetDataList.get(3).getJune()==null?
                        "0":contractGetDataList.get(3).getJune());
                julCost = julCost + Double.parseDouble( contractGetDataList.get(3).getJuly()==null?
                        "0":contractGetDataList.get(3).getJuly());
                augCost = augCost + Double.parseDouble( contractGetDataList.get(3).getAugust()==null?
                        "0":contractGetDataList.get(3).getAugust());
                sepCost = sepCost + Double.parseDouble( contractGetDataList.get(3).getSeptember()==null?
                        "0":contractGetDataList.get(3).getSeptember());
                octCost = octCost + Double.parseDouble( contractGetDataList.get(3).getOctober()==null?
                        "0":contractGetDataList.get(3).getOctober());
                novCost = novCost + Double.parseDouble( contractGetDataList.get(3).getNovember()==null?
                        "0":contractGetDataList.get(3).getNovember());
                decCost = decCost + Double.parseDouble( contractGetDataList.get(3).getDecember()==null?
                        "0":contractGetDataList.get(3).getDecember());
                totalCost = totalCost + Double.parseDouble( contractGetDataList.get(3).getTotal()==null?
                        "0":contractGetDataList.get(3).getTotal());
            }
            if (i == 4){
                janCost = janCost + Double.parseDouble( contractGetDataList.get(4).getJanuary()==null?
                        "0":contractGetDataList.get(4).getJanuary());
                febCost = febCost + Double.parseDouble( contractGetDataList.get(4).getFebruary()==null?
                        "0":contractGetDataList.get(4).getFebruary());
                marCost = marCost + Double.parseDouble( contractGetDataList.get(4).getMarch()==null?
                        "0":contractGetDataList.get(4).getMarch());
                aprCost = aprCost + Double.parseDouble( contractGetDataList.get(4).getApril()==null?
                        "0":contractGetDataList.get(4).getApril());
                mayCost = mayCost + Double.parseDouble( contractGetDataList.get(4).getMay()==null?
                        "0":contractGetDataList.get(4).getMay());
                junCost = junCost + Double.parseDouble( contractGetDataList.get(4).getJune()==null?
                        "0":contractGetDataList.get(4).getJune());
                julCost = julCost + Double.parseDouble( contractGetDataList.get(4).getJuly()==null?
                        "0":contractGetDataList.get(4).getJuly());
                augCost = augCost + Double.parseDouble( contractGetDataList.get(4).getAugust()==null?
                        "0":contractGetDataList.get(4).getAugust());
                sepCost = sepCost + Double.parseDouble( contractGetDataList.get(4).getSeptember()==null?
                        "0":contractGetDataList.get(4).getSeptember());
                octCost = octCost + Double.parseDouble( contractGetDataList.get(4).getOctober()==null?
                        "0":contractGetDataList.get(4).getOctober());
                novCost = novCost + Double.parseDouble( contractGetDataList.get(4).getNovember()==null?
                        "0":contractGetDataList.get(4).getNovember());
                decCost = decCost + Double.parseDouble( contractGetDataList.get(4).getDecember()==null?
                        "0":contractGetDataList.get(4).getDecember());
                totalCost = totalCost + Double.parseDouble( contractGetDataList.get(4).getTotal()==null?
                        "0":contractGetDataList.get(4).getTotal());

            }
            if (i == 5){
                janCost = janCost + Double.parseDouble( contractGetDataList.get(5).getJanuary()==null?
                        "0":contractGetDataList.get(5).getJanuary());
                febCost = febCost + Double.parseDouble( contractGetDataList.get(5).getFebruary()==null?
                        "0":contractGetDataList.get(5).getFebruary());
                marCost = marCost + Double.parseDouble( contractGetDataList.get(5).getMarch()==null?
                        "0":contractGetDataList.get(5).getMarch());
                aprCost = aprCost + Double.parseDouble( contractGetDataList.get(5).getApril()==null?
                        "0":contractGetDataList.get(5).getApril());
                mayCost = mayCost + Double.parseDouble( contractGetDataList.get(5).getMay()==null?
                        "0":contractGetDataList.get(5).getMay());
                junCost = junCost + Double.parseDouble( contractGetDataList.get(5).getJune()==null?
                        "0":contractGetDataList.get(5).getJune());
                julCost = julCost + Double.parseDouble( contractGetDataList.get(5).getJuly()==null?
                        "0":contractGetDataList.get(5).getJuly());
                augCost = augCost + Double.parseDouble( contractGetDataList.get(5).getAugust()==null?
                        "0":contractGetDataList.get(5).getAugust());
                sepCost = sepCost + Double.parseDouble( contractGetDataList.get(5).getSeptember()==null?
                        "0":contractGetDataList.get(5).getSeptember());
                octCost = octCost + Double.parseDouble( contractGetDataList.get(5).getOctober()==null?
                        "0":contractGetDataList.get(5).getOctober());
                novCost = novCost + Double.parseDouble( contractGetDataList.get(5).getNovember()==null?
                        "0":contractGetDataList.get(5).getNovember());
                decCost = decCost + Double.parseDouble( contractGetDataList.get(5).getDecember()==null?
                        "0":contractGetDataList.get(5).getDecember());
                totalCost = totalCost + Double.parseDouble( contractGetDataList.get(5).getTotal()==null?
                        "0":contractGetDataList.get(5).getTotal());

            }
            if (i == 6){
                janCost = janCost + Double.parseDouble( contractGetDataList.get(6).getJanuary()==null?
                        "0":contractGetDataList.get(6).getJanuary());
                febCost = febCost + Double.parseDouble( contractGetDataList.get(6).getFebruary()==null?
                        "0":contractGetDataList.get(6).getFebruary());
                marCost = marCost + Double.parseDouble( contractGetDataList.get(6).getMarch()==null?
                        "0":contractGetDataList.get(6).getMarch());
                aprCost = aprCost + Double.parseDouble( contractGetDataList.get(6).getApril()==null?
                        "0":contractGetDataList.get(6).getApril());
                mayCost = mayCost + Double.parseDouble( contractGetDataList.get(6).getMay()==null?
                        "0":contractGetDataList.get(6).getMay());
                junCost = junCost + Double.parseDouble( contractGetDataList.get(6).getJune()==null?
                        "0":contractGetDataList.get(6).getJune());
                julCost = julCost + Double.parseDouble( contractGetDataList.get(6).getJuly()==null?
                        "0":contractGetDataList.get(6).getJuly());
                augCost = augCost + Double.parseDouble( contractGetDataList.get(6).getAugust()==null?
                        "0":contractGetDataList.get(6).getAugust());
                sepCost = sepCost + Double.parseDouble( contractGetDataList.get(6).getSeptember()==null?
                        "0":contractGetDataList.get(6).getSeptember());
                octCost = octCost + Double.parseDouble( contractGetDataList.get(6).getOctober()==null?
                        "0":contractGetDataList.get(6).getOctober());
                novCost = novCost + Double.parseDouble( contractGetDataList.get(6).getNovember()==null?
                        "0":contractGetDataList.get(6).getNovember());
                decCost = decCost + Double.parseDouble( contractGetDataList.get(6).getDecember()==null?
                        "0":contractGetDataList.get(6).getDecember());
                totalCost = totalCost + Double.parseDouble( contractGetDataList.get(6).getTotal()==null?
                        "0":contractGetDataList.get(6).getTotal());

            }
       }
       DecimalFormat df = new DecimalFormat("#.00");
       janNet = janIncome - janCost;
       febNet = febIncome - febCost;
       marNet = marIncome - marCost;
       aprNet = aprIncome - aprCost;
       mayNet = mayIncome - mayCost;
       junNet = junIncome - junCost;
       julNet = julIncome - julCost;
       augNet = augIncome - augCost;
       sepNet = sepIncome - sepCost;
       octNet = octIncome - octCost;
       novNet = novIncome - novCost;
       decNet = decIncome - decCost;
       totalNet = totalIncome - totalCost;
       MainDO  netIncome = new MainDO();
       netIncome.setName("未扣除其他成本利润");
       netIncome.setJanuary(String.valueOf(df.format(janNet)));
       netIncome.setFebruary(String.valueOf(df.format(febNet)));
       netIncome.setMarch(String.valueOf(df.format(marNet)));
       netIncome.setApril(String.valueOf(df.format(aprNet)));
       netIncome.setMay(String.valueOf(df.format(mayNet)));
       netIncome.setJune(String.valueOf(df.format(junNet)));
       netIncome.setJuly(String.valueOf(df.format(julNet)));
       netIncome.setAugust(String.valueOf(df.format(augNet)));
       netIncome.setSeptember(String.valueOf(df.format(sepNet)));
       netIncome.setOctober(String.valueOf(df.format(octNet)));
       netIncome.setNovember(String.valueOf(df.format(novNet)));
       netIncome.setDecember(String.valueOf(df.format(decNet)));
       netIncome.setTotal(String.valueOf(df.format(totalNet)));
       contractGetDataList.add(7,netIncome);
       model.addAttribute("contractGetDataList", contractGetDataList);

       model.addAttribute("janIncome", df.format(janIncome));
       model.addAttribute("febIncome", df.format(febIncome));
       model.addAttribute("marIncome", df.format(marIncome));
       model.addAttribute("aprIncome", df.format(aprIncome));
       model.addAttribute("mayIncome", df.format(mayIncome));
       model.addAttribute("junIncome", df.format(junIncome));
       model.addAttribute("julIncome", df.format(julIncome));
       model.addAttribute("augIncome", df.format(augIncome));
       model.addAttribute("sepIncome", df.format(sepIncome));
       model.addAttribute("octIncome", df.format(octIncome));
       model.addAttribute("novIncome", df.format(novIncome));
       model.addAttribute("decIncome", df.format(decIncome));

       model.addAttribute("janNet", df.format(janNet));
       model.addAttribute("febNet", df.format(febNet));
       model.addAttribute("marNet", df.format(marNet));
       model.addAttribute("aprNet", df.format(aprNet));
       model.addAttribute("mayNet", df.format(mayNet));
       model.addAttribute("junNet", df.format(junNet));
       model.addAttribute("julNet", df.format(julNet));
       model.addAttribute("augNet", df.format(augNet));
       model.addAttribute("sepNet", df.format(sepNet));
       model.addAttribute("octNet", df.format(octNet));
       model.addAttribute("novNet", df.format(novNet));
       model.addAttribute("decNet", df.format(decNet));

       model.addAttribute("totalCost", df.format(totalCost));
       model.addAttribute("totalNet", df.format(totalNet));
       model.addAttribute("currentYear", currentYear);

       return "main";
	}

	@GetMapping("/403")
	String error403() {
		return "403";
	}


}
