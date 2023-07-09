using SistemaMatricula.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SistemaMatricula.Controllers
{
    public class PeriodoController : Controller
    {
        // GET: Periodo
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ObtenerPeriodos()
        {
            SistemaMatriculaEntities db = new SistemaMatriculaEntities();
            var lista = db.Periodo.Where(p => p.BHABILITADO == 1)
                .Select(p => new
                {
                    p.IIDPERIODO,
                    p.NOMBRE,
                    p.FECHAINICIO,
                    p.FECHAFIN

                }).ToList()
                .Select(p => new
                {
                    p.IIDPERIODO,
                    p.NOMBRE,
                    FECHAINICIO = ((DateTime)p.FECHAINICIO).ToString("dd/MM/yyyy"),
                    FECHAFIN = p.FECHAFIN.HasValue ? p.FECHAFIN.Value.ToString("dd/MM/yyyy") : string.Empty

                }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ObtenerPeriodosPorNombre(string nombre)
        {
            SistemaMatriculaEntities db = new SistemaMatriculaEntities();

            var lista = db.Periodo.Where(p => p.BHABILITADO == 1 && p.NOMBRE.Contains(nombre))
                .Select(p => new
                {
                    p.IIDPERIODO,
                    p.NOMBRE,
                    p.FECHAINICIO,
                    p.FECHAFIN
                }).ToList()
                .Select(p => new
                {
                    p.IIDPERIODO,
                    p.NOMBRE,
                    FECHAINICIO = ((DateTime)p.FECHAINICIO).ToString("dd/MM/yyyy"),
                    FECHAFIN =p.FECHAFIN.HasValue?p.FECHAFIN.Value.ToString("dd/MM/yyyy"):string.Empty
                }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }
    }
}